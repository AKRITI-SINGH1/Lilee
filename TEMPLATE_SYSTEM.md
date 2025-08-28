# Template System

## Overview
The Lilee playground uses a dual template system:

1. **File-based templates** (local development)
2. **Fallback templates** (production deployment)

## How it works

### Local Development
- Templates are loaded from the `lileecode-starters/` directory
- Full project structures with all files are available
- Uses the `path-to-json` utility to scan and convert templates

### Production Deployment (Vercel)
- Template directories are excluded via `.vercelignore` (too large for deployment)
- Fallback templates are embedded directly in the API route
- Provides essential starter files for each framework

## Supported Templates
- **NEXTJS**: Next.js with TypeScript and Tailwind CSS
- **REACT**: React with Create React App structure
- **EXPRESS**: Express.js server with basic middleware
- **VUE**: Vue.js with CLI structure
- **HONO**: Lightweight Hono.js framework
- **ANGULAR**: Angular with latest CLI structure

## Authentication
- Template API routes require authentication
- Users must sign in to access playground templates
- Unauthenticated requests are redirected to sign-in page

## Error Handling
- Graceful fallback when template directories are missing
- Clear error messages for authentication issues
- Fallback templates ensure playground always works

## Development

### Adding New Templates
1. Add template enum to `prisma/schema.prisma`
2. Add path mapping to `lib/template.ts`
3. Add fallback template to `app/api/template/[id]/route.ts`
4. Create template directory in `lileecode-starters/`

### Testing Templates
```bash
# Test locally with file-based templates
npm run dev

# Test production fallbacks by deleting lileecode-starters temporarily
mv lileecode-starters lileecode-starters.bak
npm run dev
# Restore after testing
mv lileecode-starters.bak lileecode-starters
```
