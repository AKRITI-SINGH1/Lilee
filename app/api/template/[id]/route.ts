import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "@/features/playground/libs/path-to-json";
import { db } from "@/lib/db";
import { templatePaths } from "@/lib/template";
import path from "path";
import fs from "fs/promises";
import { NextRequest } from "next/server";

// Helper function to ensure valid JSON
function validateJsonStructure(data: unknown): boolean {
  try {
    JSON.parse(JSON.stringify(data)); // Ensures it's serializable
    return true;
  } catch (error) {
    console.error("Invalid JSON structure:", error);
    return false;
  }
}

// Helper function to check if directory exists
async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    if (!id) {
      console.error("Missing playground ID");
      return Response.json({ error: "Missing playground ID" }, { status: 400 });
    }

    console.log("Loading playground with ID:", id);

    const playground = await db.playground.findUnique({
      where: { id },
    });

    if (!playground) {
      console.error("Playground not found for ID:", id);
      return Response.json({ error: "Playground not found" }, { status: 404 });
    }

    console.log("Playground found:", playground);

    // Check if template field exists and is valid
    if (!playground.template) {
      console.error("Playground has no template specified:", id);
      return Response.json({ error: "No template specified for this playground" }, { status: 400 });
    }

    const templateKey = playground.template as keyof typeof templatePaths;
    const templatePath = templatePaths[templateKey];

    if (!templatePath) {
      console.error("Invalid template key:", templateKey, "Available keys:", Object.keys(templatePaths));
      return Response.json({ 
        error: "Invalid template",
        details: `Template "${templateKey}" not found. Available templates: ${Object.keys(templatePaths).join(', ')}`
      }, { status: 404 });
    }

    const inputPath = path.join(process.cwd(), templatePath);
    const outputFile = path.join(process.cwd(), `output/${templateKey}.json`);

    console.log("Template key:", templateKey);
    console.log("Input Path:", inputPath);
    console.log("Output Path:", outputFile);

    // Check if the template directory exists
    const dirExists = await directoryExists(inputPath);
    if (!dirExists) {
      console.error("Template directory does not exist:", inputPath);
      console.log("Available directories in lileecode-starters:");
      try {
        const startersDir = path.join(process.cwd(), 'lileecode-starters');
        const dirs = await fs.readdir(startersDir);
        console.log("Available starter directories:", dirs);
      } catch (err) {
        console.log("Could not read lileecode-starters directory:", err);
      }
      
      return Response.json({ 
        error: "Template directory not found",
        details: `Directory ${inputPath} does not exist. Template: ${templateKey}, Path: ${templatePath}`
      }, { status: 404 });
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    await fs.mkdir(outputDir, { recursive: true });

    // Save and read the template structure
    await saveTemplateStructureToJson(inputPath, outputFile);
    const result = await readTemplateStructureFromJson(outputFile);

    console.log("Template structure loaded successfully, items count:", Array.isArray(result) ? result.length : 'N/A');

    // Validate the JSON structure before returning
    if (!validateJsonStructure(result)) {
      console.error("Invalid JSON structure in result");
      return Response.json({ error: "Invalid JSON structure" }, { status: 500 });
    }

    // Clean up the temporary file
    try {
      await fs.unlink(outputFile);
    } catch (unlinkError) {
      console.warn("Could not delete temporary file:", unlinkError);
    }

    return Response.json({ success: true, templateJson: result }, { status: 200 });

  } catch (error) {
    console.error("Error in template API route:", error);
    return Response.json({ 
      error: "Failed to generate template",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const body = await request.json();

    if (!id) {
      return Response.json({ error: "Missing playground ID" }, { status: 400 });
    }

    if (!body.templateData) {
      return Response.json({ error: "Missing template data" }, { status: 400 });
    }

    // Validate the template data structure
    if (!validateJsonStructure(body.templateData)) {
      return Response.json({ error: "Invalid template data structure" }, { status: 400 });
    }

    // Update the playground's template files in the database
    const playground = await db.playground.findUnique({
      where: { id },
    });

    if (!playground) {
      return Response.json({ error: "Playground not found" }, { status: 404 });
    }

    // Update or create template file record
    const existingFile = await db.templateFile.findFirst({
      where: { playgroundId: id }
    });

    if (existingFile) {
      await db.templateFile.update({
        where: { id: existingFile.id },
        data: { content: JSON.stringify(body.templateData) }
      });
    } else {
      await db.templateFile.create({
        data: {
          playgroundId: id,
          content: JSON.stringify(body.templateData)
        }
      });
    }

    return Response.json({ success: true, message: "Template updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating template:", error);
    return Response.json({
      error: "Failed to update template",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

