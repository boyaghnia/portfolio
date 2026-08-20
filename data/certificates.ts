export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  credentialId: string;
  link: string;
  skills: string[];
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "Cybersecurity",
    issuer: "Digital Talent Scholarship",
    date: "Aug 2025",
    description:
      "Fundamental Cybersecurity merupakan Program pembelajaran dasar keamanan siber yang memperkenalkan profesi, konsep, dan praktik utama dalam menjaga keamanan sistem dan jaringan. Peserta mempelajari jenis serangan siber, kerangka kerja keamanan (termasuk delapan domain CISSP dan konsep CIA), serta penggunaan alat analisis seperti SIEM, protokol jaringan, SQL, dan Python.",
    image: "/images/certificates/cybersecurity.png",
    credentialId: "19510934840-268",
    link: "https://digitalent.kominfo.go.id/cek-sertifikat",
    skills: [
      "Pengenalan Dunia Keamanan Siber",
      "Evolusi Keamanan Siber",
      "Melindungi dari Ancaman, Risiko, dan Kerentanan",
      "Alat Bantu Kemanan Siber dan Bahasa Pemrograman",
    ],
  },
  {
    title: "UI/UX Design",
    issuer: "Logical Operations",
    date: "Mar 2025",
    description:
      "The UI/UX Design training introduces beginners to essential UX and UI concepts, tools, and methods. It covers user needs, user-friendly design, and visually engaging interfaces. Participants will learn the full design process, from research and ideation to prototyping and testing. Key topics include design thinking, information architecture, wireframing, visual design, usability, and accessibility. Each module blends theory with hands-on exercises to build practical skills.",
    image: "/images/certificates/uiux-design.png",
    credentialId: "ab009883-d6ff-41b0-991d-bf41bc3bc29a#acc.2PHw3KVF",
    link: "https://certifications.certnexus.com/ab009883-d6ff-41b0-991d-bf41bc3bc29a#acc.2PHw3KVF",
    skills: [
      "UI/UX Design",
      "UX Research",
      "Design Thinking",
      "User Flow",
      "Information Architecture",
      "Wireframing",
      "Usability Testing",
    ],
  },
  {
    title: "Front End Web Developer",
    issuer: "Dicoding Academy",
    date: "Dec 2024",
    description:
      "Kelas ini ditujukan untuk seorang Front-End Web Developer yang ingin mengembangkan website yang memiliki fungsionalitas lebih daripada hanya media informasi saja, sesuai dengan standar industri. Di akhir kelas, siswa dapat membuat aplikasi front-end web yang interaktif serta memiliki fitur penyimpanan menggunakan web storage.",
    image: "/images/certificates/frontend-web.png",
    credentialId: "QLZ9VLRRMX5D",
    link: "https://www.dicoding.com/certificates/QLZ9VLRRMX5D",
    skills: [
      "Browser Object Model",
      "Document Object Model",
      "Interaktif dengan Event",
      "Penyimpanan Data dengan Web Storage",
    ],
  },
  {
    title: "Photoshop 2024 Essential Training",
    issuer: "LinkedIn",
    date: "Sep 2024",
    description:
      "Mempelajari dasar hingga teknik penting dalam Adobe Photoshop 2024 untuk mengolah dan menyempurnakan gambar secara digital, termasuk penggunaan layer, selection, masking, adjustment, retouching, serta typography dalam proses desain.",
    image: "/images/certificates/photoshop.png",
    credentialId:
      "23e6c3c3094825729bba73e0a14ecc5bfae6e266631375f20609f0516a63bedd",
    link: "https://www.linkedin.com/learning/certificates/23e6c3c3094825729bba73e0a14ecc5bfae6e266631375f20609f0516a63bedd",
    skills: [
      "Adobe Photoshop",
      "Graphic Design",
      "Image Editing",
      "Visual Design",
    ],
  },
  {
    title:
      "Adobe Certified Professional in Graphic Design & Illustration Using Adobe Illustrator",
    issuer: "Adobe",
    date: "Jun 2024",
    description:
      "Adobe Certified Professional (ACP) is the official certification program offered by Adobe. This program is designed to validate an individual's knowledge and skills in using various Adobe Creative Cloud (CC) software. ACP certification shows the level of ability in using Adobe visual communication applications and also shows the talent a person has in communicating ideas and creativity in the form of graphic design using Adobe applications.",
    image: "/images/certificates/adobe-ai.png",
    credentialId: "xH7T-sFWP",
    link: "https://www.credly.com/badges/de2af5c6-a621-45e1-8bb3-4db027f5d499/linked_in_profile",
    skills: ["Adobe", "Illustrator", "Graphic Design"],
  },
  {
    title: "Graphic Design",
    issuer: "Coursera - California Institute of the Arts",
    date: "Feb 2024",
    description:
      "In this Specialization, learners were equipped with a set of transferable formal and conceptual tools for “making and communicating” in the field of graphic design. Learners were exposed to the fundamental skills required to make sophisticated graphic design: process, historical context, and communication through image making and typography. Learners completed a capstone project that applies the skills of each course in a finished branding project suitable for a professional portfolio.",
    image: "/images/certificates/graphicdesign-coursera.png",
    credentialId: "HQ3969L9BMDR",
    link: "https://www.coursera.org/verify/specialization/HQ3969L9BMDR",
    skills: [
      "Fundamental Graphic Design",
      "Introduction to Typography",
      "Introduction to Imagemaking",
      "Ideas from the History of Graphic Design",
      "Brand New Brand",
    ],
  },
  {
    title: "Junior Graphic Designer",
    issuer: "Kementerian Komunikasi dan Informatika Republik Indonesia",
    date: "Jul 2023",
    description:
      "Junior Graphic Designer is a training scheme based on the Indonesian National Work Competency Standards (SKKNI). Junior Graphic Designer training participants will be able to improve their competency in designing visual communication solutions through identity, information and persuasion programs that suit the objectives of the activity provider to their audience.",
    image: "/images/certificates/junior-graphicdesigner.png",
    credentialId: "19968231320-34/GTA/BLSDM.Kominfo/2023",
    link: "https://digitalent.kominfo.go.id/cek-sertifikat?registrasi=19968231320-34",
    skills: [
      "Prinsip Dasar Desain",
      "Prinsip Dasar Komunikasi",
      "Design Brief",
      "Mengoperasikan Perangkat Lunak Desain",
      "Menciptakan Karya Desain",
    ],
  },
  {
    title: "Path Pengembangan Web (Node.js)",
    issuer: "Progate",
    date: "Apr 2021",
    description:
      "Mempelajari pengembangan aplikasi web menggunakan Node.js dan Express.js, termasuk server-side programming, routing, pengelolaan data, dan pembuatan aplikasi web dinamis.",
    image: "/images/certificates/web-nodejs.png",
    credentialId: "cd975ac2qr4idl",
    link: "https://progate.com/path_certificate/cd975ac2qr4idl",
    skills: ["HTML", "CSS", "Javascript", "Express.js", "Database"],
  },
  {
    title: "HTML, CSS, Javascript",
    issuer: "Kementerian Komunikasi dan Informatika Republik Indonesia",
    date: "Apr 2021",
    description:
      "The Professional Academy (PROA) program is one of the Digital Talent Scholarship academies which aims to improve the quality of competitiveness of Indonesia's skilled human resources in the ICT field by increasing capabilities in line with industry needs. The PROA program seeks to improve and prepare for the transfer of competence of Indonesian human resources through global and national training and certification in order to create a competent, adaptive and productive Indonesian workforce.",
    image: "/images/certificates/html-css-js.png",
    credentialId: "970777121-70/PRO.DTS/BLSDM.KOMINFO/2021",
    link: "https://komin.fo/ProADaftarProgate",
    skills: ["HTML", "CSS", "Javascript"],
  },
];
