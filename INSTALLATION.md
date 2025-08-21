# Installation Guide for M. M. Tarikul Islam Parag's Portfolio Website

## 📋 Quick Installation Checklist

Follow these steps to get your portfolio website up and running:

### ✅ Pre-Installation Requirements

1. **Install Node.js** (if not already installed)
   - Go to [nodejs.org](https://nodejs.org/)
   - Download and install the LTS version (16 or higher)
   - Verify installation: `node --version` and `npm --version`

2. **Download the Website Files**
   - Option A: Clone from GitHub: `git clone https://github.com/tarikul-du/web.git`
   - Option B: Download ZIP file from GitHub and extract

### ⚡ Installation Steps

1. **Open Terminal/Command Prompt**
   - Navigate to the website folder: `cd web`

2. **Install Dependencies**
   ```bash
   npm install
   ```
   *This may take 2-3 minutes*

3. **Start the Website**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Go to: `http://localhost:5173`
   - The setup wizard will automatically start

### 🛠 Setup Wizard Configuration

**Step 1**: Click "Let's Get Started"

**Step 2**: Site Configuration
- Site Title: `Tarikul Islam Parag - Geography & Environment Portfolio`
- Copyright: `M. M. Tarikul Islam Parag. All Rights Reserved.`

**Step 3**: Create Admin Account
- Your Name: `M. M. Tarikul Islam Parag`
- Email: `admin@tarikulparag.com` (or your preferred email)
- Password: Choose a secure password (remember this!)

**Step 4**: Initial Content
- Select "Keep Demo Content" (recommended)
- Click "Finish Setup"

### 🎯 Post-Installation

After setup completion:

1. **Access Admin Panel**: `http://localhost:5173/#/admin`
2. **Login**: Use your email and password from Step 3
3. **Customize Content**: Update your profile, works, and blog posts

## 🌐 Making It Live on the Internet

### Option 1: Netlify (Easiest - Recommended)

1. **Build the website**:
   ```bash
   npm run build
   ```

2. **Go to [netlify.com](https://netlify.com)**
3. **Drag and drop** the `dist` folder to Netlify
4. **Get your live URL** (e.g., `https://amazing-site-name.netlify.app`)

### Option 2: Vercel

1. **Push to GitHub** (if using Git)
2. **Go to [vercel.com](https://vercel.com)**
3. **Import** your GitHub repository
4. **Deploy** automatically

### Option 3: GitHub Pages

1. **Build the website**: `npm run build`
2. **Go to your GitHub repository**
3. **Settings** → **Pages**
4. **Upload** the contents of `dist` folder

## 🔧 Admin Panel Guide

### Main Admin Features:

1. **Dashboard** - Overview of your content
2. **My Profile** - Update personal information
3. **Works** - Add/edit your projects
4. **Blog** - Write and manage blog posts
5. **Categories** - Organize your content
6. **Messages** - View contact form submissions
7. **Users** - Manage admin accounts
8. **Site Settings** - Update website settings

### Adding New Content:

**To Add a New Project**:
1. Admin Panel → Works → Add Work
2. Fill in title, description, category
3. Add images and tags
4. Save

**To Write a Blog Post**:
1. Admin Panel → Blog → Add Post
2. Write your content using the rich text editor
3. Add featured image
4. Publish

## 📱 Customization Tips

### Personal Information:
- Update your photo in "My Profile"
- Add your real education details
- Update contact information
- Add your CV/resume link

### Content Strategy:
- Showcase 4-6 best projects
- Write 2-3 blog posts initially
- Use high-quality images
- Keep descriptions clear and professional

### Bangladesh Context:
- Focus on local environmental challenges
- Highlight Dhaka University affiliation
- Include Bangladesh-specific projects
- Use local case studies

## 🚨 Important Security Notes

1. **Change Default Passwords** immediately after setup
2. **Use Strong Passwords** (at least 8 characters with mixed case)
3. **Regular Backups** - Export your data monthly
4. **Keep Admin Details Private** - Don't share login credentials

## 📞 Troubleshooting

### Common Issues:

**"npm install" fails**:
- Check Node.js version: `node --version`
- Try: `npm cache clean --force`
- Delete `node_modules` folder and retry

**Website won't start**:
- Check if port 5173 is busy
- Try: `npm run dev -- --port 3000`

**Can't access admin panel**:
- Complete the setup wizard first
- Check your login credentials
- Clear browser cache

**Images not loading**:
- Check internet connection
- Use image URLs that are publicly accessible
- Consider uploading to image hosting services

## 🎓 Educational Use

This website is perfect for:
- **Academic Portfolio** - Showcase your university projects
- **Job Applications** - Professional presentation of skills
- **Research Documentation** - Document your research work
- **Networking** - Share with professors and colleagues
- **Graduate Applications** - Demonstrate technical skills

## 📈 Growth Strategy

### Phase 1 (First Month):
- Complete basic profile setup
- Add 3-4 core projects
- Write 2 introductory blog posts
- Share with university peers

### Phase 2 (3 Months):
- Add research projects
- Document internship experience
- Create tutorial blog posts
- Connect with GIS professionals

### Phase 3 (6 Months):
- Advanced project documentation
- Collaborate with classmates
- Share insights on Bangladesh's environmental challenges
- Build professional network

## 🌟 Success Tips

1. **Update Regularly** - Add new projects and experiences
2. **Quality over Quantity** - Focus on your best work
3. **Tell Stories** - Explain the impact and importance of your work
4. **Use Professional Language** - Write clearly and professionally
5. **Include Visuals** - Maps, charts, and images make content engaging
6. **Bangladesh Focus** - Highlight local relevance and impact

---

**🎯 Your Goal**: Create a professional online presence that showcases your expertise in Geography, Environment, GIS, and Remote Sensing to potential employers, graduate schools, and research collaborators.

**Need Help?** 
- Check the main README.md file for technical details
- Use the admin panel's built-in help features
- Document your questions for future reference