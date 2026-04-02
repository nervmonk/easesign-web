import Image from "next/image";

// We'll define the team members in an array of objects.
// This makes it easy to add more people in the future.
const teamMembers = [
  {
    name: "Irfan Muhammad Fauzian",
    title: "CEO",
    image: "/ceo.png", // Replace with the actual image path
  },
  {
    name: "Bayu Harudito",
    title: "COO",
    image: "/coo.png", // Replace with the actual image path
  },
  // You can easily add more team members here
  // {
  //   name: 'Another Person',
  //   title: 'CTO',
  //   image: '/team-another.jpg',
  // },
];

const TeamMemberCard = ({ member }) => (
  <div className="relative group">
    <div className="relative flex flex-col items-center p-8 bg-[#0d0c1e]/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 h-full overflow-hidden">
      
      {/* Dynamic Glow inside the card */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-600/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Profile Picture Container - Made Smaller and Circular */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full border-[3px] border-cyan-500/30 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300">
        <Image
          src={member.image}
          alt={`Photograph of ${member.name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="text-center z-10 w-full relative">
        <h3 className="font-bold tracking-wider text-white uppercase text-lg mb-2">
          {member.name}
        </h3>
        <p className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase mt-2">
          {member.title}
        </p>
      </div>

    </div>
  </div>
);

const TeamSection = () => {
  return (
    <section className="py-24 relative px-4 overflow-hidden">
      {/* Global Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 mb-20 items-end">
          <div>
            <div className="flex items-center text-xs font-bold tracking-widest text-purple-400 uppercase mb-4">
              <span className="w-8 h-px bg-purple-500/50 mr-4"></span>
              Team
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Our People
            </h2>
          </div>
          <div className="text-gray-400 leading-relaxed font-light text-lg">
            <p>
              Our team at EaseSign is composed of dedicated professionals who
              are passionate about revolutionizing business scheme. With
              expertise in advanced technology and a commitment to user-friendly
              solutions, we strive to enhance security, speed, and compliance
              for businesses of all sizes.
            </p>
          </div>
        </div>

        {/* Team Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
