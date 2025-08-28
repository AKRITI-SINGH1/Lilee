import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

// Helper function to check if directory exists
async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const templateDir = path.join(process.cwd(), 'lileecode-starters');
    const outputDir = path.join(process.cwd(), 'output');
    
    // Check template directory
    const templateDirExists = await directoryExists(templateDir);
    let availableTemplates: string[] = [];
    
    if (templateDirExists) {
      try {
        const dirs = await fs.readdir(templateDir);
        availableTemplates = dirs.filter(async (dir) => {
          const dirPath = path.join(templateDir, dir);
          return await directoryExists(dirPath);
        });
      } catch (error) {
        console.error("Error reading template directory:", error);
      }
    }
    
    // Check output directory
    const outputDirExists = await directoryExists(outputDir);
    
    return Response.json({
      status: "healthy",
      environment: process.env.NODE_ENV || "development",
      templateSystem: {
        templateDirectoryExists: templateDirExists,
        templateDirectoryPath: templateDir,
        availableTemplates: templateDirExists ? availableTemplates : [],
        usingFallbackTemplates: !templateDirExists,
      },
      outputSystem: {
        outputDirectoryExists: outputDirExists,
        outputDirectoryPath: outputDir,
      },
      timestamp: new Date().toISOString(),
    }, { status: 200 });
    
  } catch (error) {
    console.error("Health check error:", error);
    return Response.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
