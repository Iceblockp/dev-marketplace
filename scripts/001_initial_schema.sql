-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price INTEGER NOT NULL,
  running_cost INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  tech TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  complexity VARCHAR(50) NOT NULL,
  setup_time VARCHAR(50) NOT NULL,
  demo_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'draft',
  sales INTEGER DEFAULT 0,
  revenue INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  tech_specs JSONB,
  requirements JSONB,
  included TEXT[] DEFAULT '{}',
  workflow TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  project_type VARCHAR(255),
  budget VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  last_contact TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Insert sample data
INSERT INTO projects (
  title, description, long_description, price, running_cost, category, 
  tech, features, complexity, setup_time, demo_url, status, sales, revenue,
  images, tech_specs, requirements, included, workflow
) VALUES 
(
  'E-Commerce Platform',
  'Complete e-commerce solution with inventory management, payment processing, and admin dashboard',
  'A comprehensive e-commerce platform built with modern technologies, featuring a customer-facing storefront, complete admin dashboard, inventory management system, and integrated payment processing.',
  2999,
  50,
  'E-Commerce',
  ARRAY['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS', 'Prisma', 'NextAuth'],
  ARRAY['Payment Integration with Stripe', 'Inventory Management System', 'Admin Dashboard', 'Mobile Responsive Design', 'User Authentication', 'Order Management'],
  'Advanced',
  '2-3 days',
  'https://demo.example.com',
  'active',
  12,
  35988,
  ARRAY['/placeholder.svg?height=400&width=600'],
  '{"frontend": "Next.js 14, React 18, Tailwind CSS", "backend": "Next.js API Routes, Prisma ORM", "database": "PostgreSQL", "authentication": "NextAuth.js", "payments": "Stripe", "deployment": "Vercel, Railway, or AWS"}',
  '{"server": "2GB RAM, 1 CPU Core minimum", "database": "PostgreSQL 12+", "storage": "10GB minimum", "bandwidth": "Unlimited recommended"}',
  ARRAY['Complete source code', 'Database schema and migrations', 'Admin dashboard', 'User authentication system', 'Payment integration'],
  ARRAY['Purchase and receive source code', 'Set up development environment', 'Configure database and environment variables', 'Deploy to your preferred hosting platform']
),
(
  'SaaS Dashboard',
  'Modern analytics dashboard with real-time data visualization and user management',
  'A comprehensive SaaS dashboard solution with real-time analytics, user management, and data visualization capabilities.',
  1899,
  30,
  'Dashboard',
  ARRAY['React', 'Node.js', 'MongoDB', 'Chart.js', 'Socket.io', 'JWT'],
  ARRAY['Real-time Analytics', 'User Management', 'Data Visualization', 'API Integration', 'Custom Reports', 'Role-based Access'],
  'Intermediate',
  '1-2 days',
  'https://dashboard-demo.example.com',
  'active',
  8,
  15192,
  ARRAY['/placeholder.svg?height=400&width=600'],
  '{"frontend": "React 18, Chart.js, Material-UI", "backend": "Node.js, Express.js", "database": "MongoDB", "authentication": "JWT", "payments": "Stripe", "deployment": "AWS, DigitalOcean"}',
  '{"server": "1GB RAM, 1 CPU Core minimum", "database": "MongoDB 4.4+", "storage": "5GB minimum", "bandwidth": "100GB recommended"}',
  ARRAY['Complete source code', 'Database setup scripts', 'User management system', 'Analytics components', 'API documentation'],
  ARRAY['Purchase and receive source code', 'Set up Node.js environment', 'Configure MongoDB database', 'Install dependencies', 'Deploy to hosting platform']
);

-- Insert sample inquiries
INSERT INTO inquiries (name, email, company, project_type, budget, message, status, created_at) VALUES 
(
  'John Smith',
  'john@example.com',
  'Tech Corp',
  'E-Commerce Platform',
  '$2,500 - $5,000',
  'Interested in the e-commerce platform for our startup. We need something that can handle about 1000 products initially but scale up.',
  'new',
  CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
  'Sarah Johnson',
  'sarah@startup.com',
  'Startup Inc',
  'Custom Project',
  '$5,000 - $10,000',
  'Need a custom CRM solution for our sales team. Looking for lead management, email integration, and reporting features.',
  'contacted',
  CURRENT_TIMESTAMP - INTERVAL '2 days'
);
