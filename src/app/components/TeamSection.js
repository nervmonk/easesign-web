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

// Could you make Team Member card picture container smaller? Right now it's too big

const TeamMemberCard = ({ member }) => (
  <div>
    <div>
      <div>
        <Image
          src={member.image}
          alt={`Photograph of ${member.name}`}
          width={200}
          height={250}
          className="w-auto h-auto object-cover mx-auto"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="font-bold tracking-wider text-gray-800 uppercase">
          {member.name}
        </h3>
        <p className="text-sm text-gray-500 tracking-widest uppercase mt-1">
          {member.title}
        </p>
      </div>
    </div>
  </div>
);

const TeamSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center text-sm font-bold tracking-wider text-cyan-500 uppercase">
              <span className="w-8 h-px bg-cyan-500 mr-3"></span>
              Team
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Our People
            </h2>
          </div>
          <div className="text-gray-600 leading-relaxed lg:pt-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
