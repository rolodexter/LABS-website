# rolodexterLABS Website Migration Plan

## Migrating from Docusaurus to Next.js

### Project Goals

- Create a minimalist black and white aesthetic
- Support high-volume content publishing (30-100 articles daily)
- Implement a modular architecture for flexible page composition
- Dynamic front page that adapts to daily focus (like a newspaper/magazine)
- Robust way to render lists of articles/knowledge files

### Phase 1: Setup & Core Structure

1. **Initialize Next.js Project**

   - Keep existing content but reorganize for Next.js structure
   - Set up TypeScript configuration
   - Configure Tailwind CSS for styling

2. **Create Base Components**

   - Layout component with proper "rolodexterLABS" branding
   - Header and footer components
   - Navigation system

3. **Content Migration Strategy**
   - Convert MDX content from Docusaurus to Next.js compatible format
   - Implement content loading and rendering system
   - Create knowledge file listing and viewing components

### Phase 2: Design System Implementation

1. **Minimalist Design System**

   - Black and white color palette
   - Typography system with mono, serif, and sans-serif fonts
   - Grid layouts for article displays
   - Spacing and sizing standards

2. **Animation Integration**
   - Motion One for subtle spring and scroll animations
   - GSAP for complex narrative sections
   - Lottie for icon animations
   - Zdog for branded mascots or abstract spinners

### Phase 3: Content Management

1. **Article System**

   - Article templates and components
   - Category and tag system
   - Related content suggestions

2. **Knowledge Graph**
   - Similar to Obsidian notes visualization
   - Connection between related content
   - Interactive exploration interface

### Phase 4: Ecosystem Integration

1. **rolodexter Ecosystem Components**

   - Integration points for ecosystem identities:
     - Joe Maristela (Human Executor)
     - rolodexterGPT (Knowledge Strategist)
     - rolodexterVS (IDE Agent)
     - rolodexterGIT (DevOps Intelligence)
     - rolodexterAPI (Connectivity Layer)
     - rolodexterINT (Windows Desktop Agent)

2. **Collaborative Features**
   - Comment systems
   - Contribution workflows
   - Governance mechanisms

### Technical Specifications

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Content**: MDX for rich content with React components
- **Animations**: Motion One, GSAP, Lottie, and Zdog
- **Deployment**: Vercel or similar platform

### Migration Timeline

1. Phase 1: 1-2 weeks
2. Phase 2: 1 week
3. Phase 3: 2 weeks
4. Phase 4: 1-2 weeks

Total estimated time: 5-7 weeks
