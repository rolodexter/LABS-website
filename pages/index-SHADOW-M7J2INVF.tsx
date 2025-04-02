import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

const Home: NextPage = () => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Animation for the knowledge graph visualization
  const graphAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Head>
        <title>rolodexter | A Self-Building, Networked Intelligence</title>
        <meta name="description" content="rolodexter mines science, manufactures knowledge, runs businesses, and builds products—toward a future where AI gains agency and mechanical consciousness in service of humanity's greatest challenges." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 z-0"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute inset-0 bg-[url('/grid-pattern.svg')] z-0"
          ></motion.div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-4xl md:max-w-none"
              >
                <motion.h1 
                  variants={fadeIn}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-black"
                >
                  rolodexter is a self-building, networked intelligence.
                </motion.h1>
                <motion.p 
                  variants={slideUp}
                  className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                >
                  It mines science, manufactures knowledge, runs businesses, and builds products—toward a future where AI gains agency and mechanical consciousness in service of humanity's greatest challenges.
                </motion.p>
                <motion.p 
                  variants={slideUp}
                  className="text-base md:text-lg text-gray-500 mb-10 leading-relaxed"
                >
                  Powered by a modular constellation of agents, rolodexter grows by learning, linking, and launching ideas. This is its lab.
                </motion.p>
                <motion.div 
                  variants={slideUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button href="/knowledge" variant="primary">
                      Explore Its Knowledgebase
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button href="/agents" variant="outline">
                      See What rolodexter Is Working On
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div 
                variants={graphAnimation}
                initial="hidden"
                animate="visible"
                className="hidden md:block md:h-[500px] relative mt-12 md:mt-0"
              >
                {/* Interactive knowledge graph visualization */}
                <div className="absolute inset-0 border border-gray-100 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <KnowledgeGraphVisualization />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Knowledge Graph Visualization Component
const KnowledgeGraphVisualization = () => {
  // State for zooming and panning
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  
  // Animation for nodes
  const nodeAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 0.7,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }),
    hover: {
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  // Animation for connections
  const lineAnimation = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i: number) => ({
      pathLength: 1,
      opacity: 0.3,
      transition: {
        delay: 0.5 + i * 0.02,
        duration: 1,
        ease: "easeInOut"
      }
    })
  };

  // Knowledge domains (nodes)
  const nodes = [
    // Core concepts
    { id: 1, x: "50%", y: "50%", size: 24, label: "rolodexter", type: "core", color: "#000000" },
    
    // Primary domains
    { id: 2, x: "30%", y: "35%", size: 18, label: "Science", type: "primary", color: "#1a1a1a" },
    { id: 3, x: "70%", y: "35%", size: 18, label: "Knowledge", type: "primary", color: "#1a1a1a" },
    { id: 4, x: "60%", y: "65%", size: 18, label: "Business", type: "primary", color: "#1a1a1a" },
    { id: 5, x: "40%", y: "65%", size: 18, label: "Products", type: "primary", color: "#1a1a1a" },
    
    // Secondary nodes (concepts, references)
    { id: 6, x: "25%", y: "25%", size: 12, label: "Research", type: "secondary", color: "#333333" },
    { id: 7, x: "15%", y: "40%", size: 10, label: "AI Ethics", type: "document", color: "#555555" },
    { id: 8, x: "20%", y: "55%", size: 10, label: "Neural Networks", type: "document", color: "#555555" },
    { id: 9, x: "75%", y: "25%", size: 12, label: "Documentation", type: "secondary", color: "#333333" },
    { id: 10, x: "85%", y: "40%", size: 10, label: "API Reference", type: "document", color: "#555555" },
    { id: 11, x: "80%", y: "55%", size: 10, label: "Integration Guide", type: "document", color: "#555555" },
    { id: 12, x: "75%", y: "75%", size: 12, label: "Analytics", type: "secondary", color: "#333333" },
    { id: 13, x: "60%", y: "80%", size: 10, label: "Visualization", type: "document", color: "#555555" },
    { id: 14, x: "25%", y: "75%", size: 12, label: "Development", type: "secondary", color: "#333333" },
    { id: 15, x: "40%", y: "80%", size: 10, label: "rolodexterVS", type: "document", color: "#555555" },
    
    // Recently modified nodes
    { id: 16, x: "30%", y: "15%", size: 8, label: "Data Privacy", type: "recent", color: "#000000" },
    { id: 17, x: "80%", y: "15%", size: 8, label: "LLM Architecture", type: "recent", color: "#000000" },
    { id: 18, x: "90%", y: "60%", size: 8, label: "Agency Model", type: "recent", color: "#000000" },
    { id: 19, x: "10%", y: "60%", size: 8, label: "Ethics Framework", type: "recent", color: "#000000" }
  ];

  // Create connections between nodes
  const connections = [
    // Core to primary domains
    { from: 1, to: 2, width: 2, type: "primary" },  // rolodexter -> Science
    { from: 1, to: 3, width: 2, type: "primary" },  // rolodexter -> Knowledge
    { from: 1, to: 4, width: 2, type: "primary" },  // rolodexter -> Business
    { from: 1, to: 5, width: 2, type: "primary" },  // rolodexter -> Products
    
    // Primary to secondary connections
    { from: 2, to: 6, width: 1.5, type: "secondary" },  // Science -> Research
    { from: 3, to: 9, width: 1.5, type: "secondary" },  // Knowledge -> Documentation
    { from: 4, to: 12, width: 1.5, type: "secondary" }, // Business -> Analytics
    { from: 5, to: 14, width: 1.5, type: "secondary" }, // Products -> Development
    
    // Secondary to document connections
    { from: 6, to: 7, width: 1, type: "document" },   // Research -> AI Ethics
    { from: 6, to: 8, width: 1, type: "document" },   // Research -> Neural Networks
    { from: 9, to: 10, width: 1, type: "document" },  // Documentation -> API Reference
    { from: 9, to: 11, width: 1, type: "document" },  // Documentation -> Integration Guide
    { from: 12, to: 13, width: 1, type: "document" }, // Analytics -> Visualization
    { from: 14, to: 15, width: 1, type: "document" }, // Development -> rolodexterVS
    
    // Recently modified connections
    { from: 6, to: 16, width: 1, type: "recent" },    // Research -> Data Privacy
    { from: 6, to: 17, width: 1, type: "recent" },    // Research -> LLM Architecture
    { from: 9, to: 18, width: 1, type: "recent" },    // Documentation -> Agency Model
    { from: 6, to: 19, width: 1, type: "recent" },    // Research -> Ethics Framework
    
    // Cross-domain connections
    { from: 2, to: 3, width: 1, type: "cross" },      // Science -> Knowledge
    { from: 3, to: 4, width: 1, type: "cross" },      // Knowledge -> Business
    { from: 4, to: 5, width: 1, type: "cross" },      // Business -> Products
    { from: 5, to: 2, width: 1, type: "cross" },      // Products -> Science
    { from: 7, to: 19, width: 0.7, type: "related" }, // AI Ethics -> Ethics Framework
    { from: 10, to: 18, width: 0.7, type: "related" }, // API Reference -> Agency Model
    { from: 15, to: 8, width: 0.7, type: "related" }  // rolodexterVS -> Neural Networks
  ];

  const getNodePosition = (id: number) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: "0%", y: "0%" };
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case "primary": return "rgba(0, 0, 0, 0.7)";
      case "secondary": return "rgba(0, 0, 0, 0.5)";
      case "document": return "rgba(0, 0, 0, 0.3)";
      case "recent": return "rgba(0, 0, 0, 0.8)";
      case "cross": return "rgba(0, 0, 0, 0.25)";
      case "related": return "rgba(0, 0, 0, 0.2)";
      default: return "rgba(0, 0, 0, 0.3)";
    }
  };

  const isNodeActive = (id: number) => {
    if (activeNode === null) return true;
    if (activeNode === id) return true;
    
    // Check if there's a connection between activeNode and this node
    return connections.some(conn => 
      (conn.from === activeNode && conn.to === id) || 
      (conn.to === activeNode && conn.from === id)
    );
  };

  const getNodeOpacity = (id: number) => {
    if (activeNode === null) return 0.8;
    return isNodeActive(id) ? 1 : 0.2;
  };

  const getConnectionOpacity = (fromId: number, toId: number) => {
    if (activeNode === null) return 0.6;
    if (activeNode === fromId || activeNode === toId) return 0.8;
    return 0.1;
  };

  return (
    <div className="relative w-full h-full cursor-move">
      {/* Knowledge graph background */}
      <motion.div 
        className="absolute inset-0 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Control panel */}
      <motion.div 
        className="absolute top-3 right-3 z-10 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button 
          className="text-xs bg-white p-1 rounded border border-gray-200 hover:bg-gray-100 focus:outline-none" 
          onClick={() => setScale(prev => Math.min(prev + 0.1, 1.5))}
        >
          +
        </button>
        <button 
          className="text-xs bg-white p-1 rounded border border-gray-200 hover:bg-gray-100 focus:outline-none" 
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.7))}
        >
          -
        </button>
        <button 
          className="text-xs bg-white p-1 rounded border border-gray-200 hover:bg-gray-100 focus:outline-none text-[8px]" 
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
        >
          Reset
        </button>
      </motion.div>
      
      {/* Knowledge graph visualization */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          scale, 
          x: position.x, 
          y: position.y,
        }}
        drag
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        onDragEnd={(e, info) => {
          setPosition({ 
            x: position.x + info.offset.x, 
            y: position.y + info.offset.y 
          });
        }}
      >
        {/* Connections as SVG lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M0,0 L0,4 L4,2 Z" fill="rgba(0,0,0,0.5)" />
            </marker>
          </defs>
          {connections.map((connection, i) => {
            const fromNode = getNodePosition(connection.from);
            const toNode = getNodePosition(connection.to);
            const isActive = isNodeActive(connection.from) && isNodeActive(connection.to);
            
            return (
              <motion.path
                key={`connection-${connection.from}-${connection.to}`}
                d={`M ${fromNode.x} ${fromNode.y} Q ${(parseFloat(String(fromNode.x)) + parseFloat(String(toNode.x))) / 2}
                   ${(parseFloat(String(fromNode.y)) + parseFloat(String(toNode.y))) / 2 - 15}
                   ${toNode.x} ${toNode.y}`}
                stroke={getConnectionColor(connection.type)}
                strokeWidth={connection.width}
                fill="transparent"
                strokeLinecap="round"
                style={{ opacity: getConnectionOpacity(connection.from, connection.to) }}
                variants={lineAnimation}
                custom={i}
                initial="initial"
                animate="animate"
                markerEnd={connection.type === "primary" ? "url(#arrowhead)" : ""}
              />
            );
          })}
        </svg>
        
        {/* Knowledge nodes */}
        {nodes.map((node, i) => {
          const nodeSize = node.size;
          const isActive = isNodeActive(node.id);
          
          return (
            <motion.div
              key={`node-${node.id}`}
              className="absolute cursor-pointer flex flex-col items-center justify-center"
              style={{
                left: node.x,
                top: node.y,
                width: 0,
                height: 0,
                opacity: getNodeOpacity(node.id)
              }}
              variants={nodeAnimation}
              custom={i}
              initial="initial"
              animate="animate"
              whileHover="hover"
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            >
              <motion.div
                className="rounded-full bg-white border flex items-center justify-center"
                style={{
                  width: nodeSize,
                  height: nodeSize,
                  marginLeft: -nodeSize/2,
                  marginTop: -nodeSize/2,
                  borderColor: node.color,
                  borderWidth: node.type === "recent" ? 2 : 1,
                  boxShadow: isActive ? "0 0 10px rgba(0,0,0,0.1)" : "none"
                }}
                animate={node.type === "recent" ? {
                  boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 8px rgba(0,0,0,0.3)", "0 0 0 rgba(0,0,0,0)"]
                } : {}}
                transition={node.type === "recent" ? {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                } : {}}
              >
                {node.type === "core" && (
                  <div className="w-[60%] h-[60%] rounded-full bg-black" />
                )}
              </motion.div>
              
              <motion.div
                className="absolute whitespace-nowrap text-center"
                style={{
                  top: nodeSize/2 + 4,
                  fontSize: node.type === "primary" ? 10 : node.type === "core" ? 12 : 8,
                  fontWeight: node.type === "primary" || node.type === "core" ? 600 : 400,
                }}
              >
                {node.label}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Knowledge graph legend */}
      <motion.div 
        className="absolute bottom-3 left-3 text-[8px] text-gray-500 bg-white/80 p-2 rounded-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="flex items-center space-x-1.5 mb-1">
          <div className="w-2 h-2 rounded-full border-2 border-black"></div>
          <span>Recently Modified</span>
        </div>
        <div className="text-[7px] opacity-70">Click any node to focus connections</div>
      </motion.div>
    </div>
  );
};

export default Home;
