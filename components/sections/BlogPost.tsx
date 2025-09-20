'use client';

import { useRouter } from 'next/navigation';
import { Blog } from '@/types/portfolio';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

interface BlogPostProps {
  blog: Blog;
}

export function BlogPost({ blog }: BlogPostProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Placeholder content for each blog
  const getPlaceholderContent = (slug: string) => {
    const content = {
      'getting-started-embedded-systems': `
        <p>Embedded systems programming is the foundation of modern IoT and hardware development. This comprehensive guide will walk you through the essential concepts and practical applications.</p>
        
        <h2>What are Embedded Systems?</h2>
        <p>Embedded systems are computer systems designed for specific functions within larger mechanical or electrical systems. They are everywhere - from your smartphone to your car's engine control unit.</p>
        
        <h2>Key Components</h2>
        <ul>
          <li><strong>Microcontroller/Microprocessor:</strong> The brain of the system</li>
          <li><strong>Memory:</strong> Both volatile (RAM) and non-volatile (Flash/EEPROM)</li>
          <li><strong>Input/Output interfaces:</strong> Sensors, actuators, communication ports</li>
          <li><strong>Power management:</strong> Efficient power consumption strategies</li>
        </ul>
        
        <h2>Programming Languages</h2>
        <p>The most common programming languages for embedded systems include:</p>
        <ul>
          <li><strong>C:</strong> The most widely used language for embedded programming</li>
          <li><strong>C++:</strong> Object-oriented approach for complex systems</li>
          <li><strong>Assembly:</strong> For low-level hardware control</li>
          <li><strong>Python:</strong> For rapid prototyping with platforms like Raspberry Pi</li>
        </ul>
        
        <h2>Development Process</h2>
        <p>Developing embedded systems typically follows these stages:</p>
        <ol>
          <li>Requirements analysis and system design</li>
          <li>Hardware selection and circuit design</li>
          <li>Firmware development and testing</li>
          <li>Integration and system testing</li>
          <li>Deployment and maintenance</li>
        </ol>
        
        <h2>Getting Started</h2>
        <p>To begin your journey in embedded systems programming, I recommend starting with popular development boards like Arduino or STM32 Nucleo. These platforms provide excellent learning opportunities with extensive community support.</p>
      `,
      'iot-prototype-to-production': `
        <p>Taking an IoT project from prototype to production involves careful planning, robust design, and thorough testing. This guide covers the essential steps and considerations.</p>
        
        <h2>Prototype Phase</h2>
        <p>The prototype phase is crucial for validating your concept and identifying potential challenges early in the development process.</p>
        
        <h3>Hardware Selection</h3>
        <ul>
          <li><strong>Development Boards:</strong> Arduino, Raspberry Pi, ESP32</li>
          <li><strong>Sensors and Actuators:</strong> Choose appropriate components for your use case</li>
          <li><strong>Communication Modules:</strong> WiFi, Bluetooth, LoRa, cellular</li>
        </ul>
        
        <h2>Cloud Integration</h2>
        <p>Modern IoT solutions require robust cloud infrastructure for data processing and device management.</p>
        
        <h3>Popular IoT Platforms</h3>
        <ul>
          <li><strong>AWS IoT Core:</strong> Comprehensive enterprise solution</li>
          <li><strong>Google Cloud IoT:</strong> Machine learning integration</li>
          <li><strong>Microsoft Azure IoT:</strong> Enterprise-focused platform</li>
          <li><strong>ThingSpeak:</strong> Great for educational projects</li>
        </ul>
        
        <h2>Security Considerations</h2>
        <p>Security should be built into your IoT solution from the ground up:</p>
        <ul>
          <li>Device authentication and encryption</li>
          <li>Secure communication protocols (TLS/SSL)</li>
          <li>Regular security updates and patches</li>
          <li>Data privacy and compliance</li>
        </ul>
        
        <h2>Production Challenges</h2>
        <p>Moving from prototype to production involves addressing scalability, reliability, and cost considerations. Key factors include component sourcing, manufacturing processes, and quality assurance.</p>
      `,
      '5g-security-vulnerabilities': `
        <p>5G networks represent the next generation of wireless communication, but they also introduce new security challenges that must be carefully addressed.</p>
        
        <h2>5G Architecture Overview</h2>
        <p>Understanding the 5G architecture is crucial for identifying potential security vulnerabilities:</p>
        <ul>
          <li><strong>Core Network:</strong> Service-based architecture with network functions</li>
          <li><strong>Radio Access Network (RAN):</strong> gNodeB and distributed units</li>
          <li><strong>User Equipment (UE):</strong> Devices connecting to the network</li>
        </ul>
        
        <h2>Common Vulnerabilities</h2>
        <h3>Protocol-Level Attacks</h3>
        <ul>
          <li><strong>Authentication bypasses:</strong> Exploiting weaknesses in the AKA protocol</li>
          <li><strong>Downgrade attacks:</strong> Forcing devices to use less secure protocols</li>
          <li><strong>Man-in-the-middle attacks:</strong> Intercepting communication</li>
        </ul>
        
        <h3>Implementation Flaws</h3>
        <ul>
          <li>Improper certificate validation</li>
          <li>Weak encryption implementations</li>
          <li>Buffer overflow vulnerabilities</li>
        </ul>
        
        <h2>Detection Methods</h2>
        <p>Our research focuses on developing automated tools for vulnerability detection:</p>
        <ul>
          <li><strong>Software-Defined Radio (SDR):</strong> Using USRP devices for signal analysis</li>
          <li><strong>Protocol analyzers:</strong> Deep packet inspection tools</li>
          <li><strong>Machine learning:</strong> Anomaly detection algorithms</li>
        </ul>
        
        <h2>Mitigation Strategies</h2>
        <p>Protecting 5G networks requires a multi-layered approach including proper configuration, regular updates, and continuous monitoring.</p>
      `,
      'optimizing-usrp-performance': `
        <p>Universal Software Radio Peripherals (USRPs) are powerful tools for software-defined radio applications, but achieving optimal performance requires careful optimization.</p>
        
        <h2>USRP Architecture</h2>
        <p>Understanding the USRP hardware architecture is essential for optimization:</p>
        <ul>
          <li><strong>RF Frontend:</strong> Antenna interfaces and RF processing</li>
          <li><strong>ADC/DAC:</strong> Analog-to-digital and digital-to-analog converters</li>
          <li><strong>FPGA:</strong> Field-programmable gate array for signal processing</li>
          <li><strong>Host Interface:</strong> USB, Ethernet, or PCIe connection</li>
        </ul>
        
        <h2>Performance Bottlenecks</h2>
        <h3>Interface Limitations</h3>
        <ul>
          <li><strong>USB 3.0:</strong> Limited to ~200 MS/s for sustained rates</li>
          <li><strong>Gigabit Ethernet:</strong> Theoretical maximum around 100 MS/s</li>
          <li><strong>10 GigE:</strong> Can handle higher sample rates but requires proper tuning</li>
        </ul>
        
        <h3>Host Computer Performance</h3>
        <ul>
          <li>CPU processing power and memory bandwidth</li>
          <li>Operating system scheduling and interrupts</li>
          <li>Buffer management and memory allocation</li>
        </ul>
        
        <h2>Optimization Techniques</h2>
        <h3>Hardware Optimization</h3>
        <ul>
          <li><strong>Proper grounding:</strong> Minimize noise and interference</li>
          <li><strong>Clock synchronization:</strong> Use external references when needed</li>
          <li><strong>Thermal management:</strong> Ensure adequate cooling</li>
        </ul>
        
        <h3>Software Optimization</h3>
        <ul>
          <li><strong>Buffer sizing:</strong> Optimize for your specific application</li>
          <li><strong>Threading:</strong> Separate processing and I/O threads</li>
          <li><strong>Memory management:</strong> Use memory pools and avoid allocations in real-time paths</li>
        </ul>
        
        <h2>Real-time Considerations</h2>
        <p>For real-time applications, consider using real-time operating systems, dedicated processing cores, and hardware acceleration where possible.</p>
      `
    };
    
    return content[slug as keyof typeof content] || '<p>Content coming soon...</p>';
  };

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => router.push('/blogs')}
          className="flex items-center space-x-2 text-black dark:text-white hover:opacity-70 transition-minimal"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="text-sm uppercase tracking-wider">Back to Blog</span>
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Blog Content */}
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 robotic-subtitle leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <time>{formatDate(blog.date)}</time>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8"></div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:robotic-subtitle prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: getPlaceholderContent(blog.slug) 
            }}
          />
        </div>
      </div>
    </article>
  );
}