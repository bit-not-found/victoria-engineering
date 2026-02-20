export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    image: string;
    category: string;
    readTime: string;
    slug: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: "Sustainable Infrastructure: Building for South Africa's Future",
        excerpt: "Discover how Victoria Engineering is integrating sustainable practices into civil projects to create resilient urban environments.",
        content: `
            <div class="space-y-6">
                <p class="lead text-lg text-muted-foreground">As South Africa continues to urbanize, the pressure on our infrastructure has never been greater. Sustainable engineering isn't just a trend; it's a necessity for ensuring our cities can thrive in a changing climate.</p>
                
                <h2 class="text-2xl font-bold">1. The Shift to Circular Materials</h2>
                <p>We are moving away from the "take-make-waste" model. In our recent road development projects, we've successfully integrated recycled asphalt and eco-friendly concrete alternatives. These materials not only reduce carbon footprints but often provide superior durability in extreme weather conditions.</p>
                
                <h2 class="text-2xl font-bold">2. Water-Sensitive Urban Design (WSUD)</h2>
                <p>South Africa's water scarcity requires innovative stormwater management. Our civil teams are implementing WSUD principles, transforming traditional drainage into permeable systems that recharge local aquifers and reduce the risk of flash flooding during summer storms.</p>
                
                <blockquote class="border-l-4 border-primary pl-4 my-6 italic">
                    "Sustainable infrastructure is about creating systems that serve today's needs without compromising the ability of future generations to meet theirs."
                </blockquote>

                <h2 class="text-2xl font-bold">3. Resilience Against Climate Extremes</h2>
                <p>From Cape Town's drought to KwaZulu-Natal's floods, infrastructure must be built to withstand more frequent and severe events. Our engineering assessments now include rigorous climate-fatigue modeling to ensure long-term structural integrity.</p>
                
                <p>Victoria Engineering remains committed to pioneering these sustainable frontiers, ensuring that every road, bridge, and pipeline we design contributes to a greener, more resilient South Africa.</p>
            </div>
        `,
        date: "Feb 12, 2026",
        author: {
            name: "Dr. Elena Vance",
            avatar: "/characters/output/Oliver2.png",
            role: "Principal Civil Engineer"
        },
        image: "https://images.unsplash.com/photo-1602516550763-a3f00de59f33?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Civil Engineering",
        readTime: "7 min read",
        slug: "sustainable-infrastructure-sa"
    },
    {
        id: '2',
        title: "Optimizing Industrial Processes with Digital Twin Technology",
        excerpt: "How real-time simulations are revolutionizing process efficiency and reducing downtime in manufacturing plants.",
        content: `
            <div class="space-y-6">
                <p class="lead text-lg text-muted-foreground">In the competitive world of industrial manufacturing, efficiency is the difference between profit and loss. Digital twin technology is the bridge between physical plants and virtual optimization.</p>
                
                <h2 class="text-2xl font-bold">What is a Digital Twin?</h2>
                <p>A digital twin is a near real-time virtual representation of a physical process or object. For a manufacturing plant, this means mirroring everything from individual pump performance to entire assembly line flows using high-fidelity sensor data.</p>
                
                <h2 class="text-2xl font-bold">Predictive Maintenance vs. Reactive Fixes</h2>
                <p>The greatest advantage of a digital twin is predictive insight. Instead of waiting for a motor to fail, our systems analyze vibration patterns and heat signatures to predict failure weeks in advance, allowing for scheduled maintenance that doesn't disrupt production.</p>
                
                <div class="bg-secondary p-6 rounded-xl border border-border">
                    <h3 class="font-bold mb-2">Impact at a Glance:</h3>
                    <ul class="list-disc ml-5 space-y-1">
                        <li>Reduce unplanned downtime by up to 30%</li>
                        <li>Optimize energy consumption by 15%</li>
                        <li>Extend equipment lifespan by identifying sub-optimal operating conditions early</li>
                    </ul>
                </div>

                <h2 class="text-2xl font-bold">Scaling for the Future</h2>
                <p>As sensor costs drop and AI capabilities rise, digital twins are becoming accessible to even medium-sized industrial operations. Victoria Engineering specializes in retrofitting existing plants with the necessary instrumentation to start their digital journey.</p>
            </div>
        `,
        date: "Jan 28, 2026",
        author: {
            name: "Marcus Thorne",
            avatar: "/characters/output/Oliver1.png",
            role: "Process Automation Specialist"
        },
        image: "https://images.unsplash.com/photo-1723177548474-b58ada59986b?q=80&w=412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Process Engineering",
        readTime: "9 min read",
        slug: "digital-twin-industrial-optimization"
    },
    {
        id: '3',
        title: "The Role of Microgrids in the South African Power Landscape",
        excerpt: "As the national grid faces challenges, localized power solutions are becoming the backbone of industrial and commercial reliability.",
        content: `
            <div class="space-y-6">
                <p class="lead text-lg text-muted-foreground">South Africa's energy landscape is shifting from a centralized model to a decentralized one. Microgrids are at the heart of this transition, offering energy independence and reliability.</p>
                
                <h2 class="text-2xl font-bold">1. Decentralization for Reliability</h2>
                <p>A microgrid is a localized group of electricity sources and loads that normally operates connected to and synchronous with the traditional wide-area synchronous grid, but can also disconnect to "island mode"—and operate autonomously as physical or economic conditions dictate.</p>
                
                <h2 class="text-2xl font-bold">2. Integrating Renewables</h2>
                <p>One of the biggest hurdles in South Africa is integrating intermittent solar and wind into the grid. Microgrids solve this by incorporating Battery Energy Storage Systems (BESS) and intelligent controllers that balance supply and demand in real-time.</p>

                <h2 class="text-2xl font-bold">3. Case Study: Industrial Energy Independence</h2>
                <p>We recently designed an electrical reticulation system for a large processing plant that combines rooftop solar, a primary grid connection, and diesel backup, all managed by a smart controller. The result? Zero halts in production despite ongoing national load-shedding schedules.</p>
                
                <p>At Victoria Engineering, we believe that the future of South African power is local, smart, and resilient. Our electrical engineering teams are leading the charge in designing the next generation of power reticulation.</p>
            </div>
        `,
        date: "Jan 15, 2026",
        author: {
            name: "Sarah Jenkins",
            avatar: "/characters/output/Worker.png",
            role: "Senior Electrical Engineer"
        },
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60",
        category: "Electrical Engineering",
        readTime: "6 min read",
        slug: "microgrids-south-africa-energy"
    }
];
