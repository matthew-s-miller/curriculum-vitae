

export const HEADER = {
  title: "MATTHEW MILLER",
  subtitle: "SOFTWARE DEVELOPER",
  location: "Perth, Australia",
  contact: ["0409 388 123", "miller.matthew@gmail.com"],
}

export const HELLO = `I am a full-stack software engineer with 25 years of experience. Recently, I've
built a lot of web front ends using tooling such as Angular, Vue and React. I've used Java throughout most
of my career, and recently have developed an affinity with Typescript.`

export const MORE_INFO = [
  "linkedin.com/in/matthewmillerprofile",
  "stackoverflow.com/users/2431784/miller",
  "github.com/matthew-s-miller"
]

export const EDUCATION = [
  {
    period: "1994-97",
    institution: "The University of Western Australia",
    attainment: "Bachelor of Computer and Mathematical Sciences",
    level: "First Class Honours"
  },
  {
    period: "2007",
    institution: "Sun Microsystems",
    attainment: "Sun Certified Java Developer",
  },
  {
    period: "2017",
    institution: "Stanford University (Coursera)",
    attainment: "Certificate in Machine Learning",
  }
]

export const SKILLS = [
  {
    type: 'Front End',
    skills: [
      {name: 'Typescript', level: 5},
      {name: 'Angular', level: 5},
      {name: 'Vue', level: 5},
      {name: 'React', level: 4},
      {name: 'HTML & CSS', level: 4},
      // {name: 'SVG', level: 5},
      // {name: 'UI Design', level: 3}
    ]
  },
  {
    type: 'Server Side',
    skills: [
      {name: 'Java', level: 5},
      {name: 'NodeJS', level: 4},
      {name: 'Groovy', level: 4},
      {name: 'Python', level: 3},
      {name: 'Rust', level: 2},
    ]
  },
  {
    type: 'Database',
    skills: [
      {name: 'RDBMS', level: 5},
      {name: 'Neo4J', level: 5},
      {name: 'MongoDB', level: 4},
      {name: 'IndexedDB', level: 4},
      {name: 'Lucene', level: 3}
    ]
  }
]

export const CAREER = [
  {
    company: "ShockWave Technologies",
    period: "2022 - current",
    role: "Consultant",
    description: `Developed a tool for modelling terrain and planning blasts. Implemented in React, using IndexedDB for storage, the
    systems allows for the input of site dimensions, drilling topology and explosive composition. The React based UI shows a realtime
    3D model of the site, powered by Three.js`,
    tech: ["React", "Three.js"]
  },
  {
    company: "Gaia Resources",
    period: "2022",
    role: "Front End Developer",
    description: `A short project to develop a spreadsheet UI used for analysis and classification of species and flora
    sightings. The User Interface was based around the development of a DataGrid component developed in Vue 3. The DataGrid
    provided a full suite of rich features, including virtual scrolling, column resizing, cell selection and drag 'n drop.`,
    tech: ["Vue", "Python", "MongoDB"]
  },
  {
    company: "MyPass Global",
    period: "2018-21",
    role: "Senior/Lead Developer",
    description: `Responsible for all aspects of MyPass' design and architecture. Additionally consulted to clients
    and managed key integrations. MyPass' architecture was built around the idea of using a graph database to model
    relationships between Workers and Employers, and the applicatability of Certifications and competency records`,
    tech: ["Angular", "Java", "Neo4J"]
  },
  {
    company: "Onyx Services",
    period: "2017",
    role: "Applications Architect",
    description: `Developed the web front end to a Gas Trading application using Angular.
    The front end architecure made use of RXJS to provide real-time position projections. 
    This design greatly influenced my approach to front end UIs going forward`,
    tech: ["Angular", "Java", "Postgresql"]
  },
  {
    company: "SmartBeat",
    period: "2016",
    role: "Consultant",
    description: `Developed the web front end to an analytics dashboard. `,
    tech: ["Vanilla JS"]
  },
  {
    company: "Synergy",
    period: "2008-15",
    role: "Senior/Lead Developer",
    description: `Developer for numerous projects over a 7 year timeframe. Projects ranged from front-end
    applications, such as Synergy 'MyAccount', to internal projects such as energy trading systems. Part
    of my role was to lead development teams of up to 6 personnel, provide mentoring, and overall technical
    guidance`,
    tech: ["AngularJS", "Java", "Oracle"]
  },
  {
    company: "AOL UK",
    period: "2007-08",
    role: "Java Developer",
    description: "6 month contract",
    tech: ["Java"]
  },
  {
    company: "Caplin Systems, UK",
    period: "2007",
    role: "Front End Developer",
    description: "Front End Development for an FI/FX Trading System",
    tech: ["Vanilla JS"]
  },
  {
    company: "Reed Elsievier UK",
    period: "2005-08",
    role: "Java Developer",
    description: "Developed a Distributed 'Terminology' Service",
    tech: ["Java"]
  },
  {
    company: "BankWest",
    period: "2005",
    role: "Java Developer",
    description: "Mostly Java based projects",
    tech: ["Java"]
  },
  {
    company: "eBooks Corporation",
    period: "2004",
    role: "Java Developer",
    description: "Mostly Java based projects",
    tech: ["Java"]
  },
  {
    company: "ASGARD Wealth Solutions",
    period: "1998-03",
    role: "Analyst / Programmer",
    description: "Mostly Java based projects",
    tech: [] // "Java", "C++", "Oracle"
  }
]

export const ABOUT = [
  "CV source code: github.com/matthew-s-miller",
  "See also: stackoverflow.com/users/2431784/miller"
]
// or connect on LinkedIn linkedin.com/in/matthewmillerprofile