// constants/milestones.js
export const MILESTONE_DATA = {
  // 0-3 months
  "0-3": {
    label: "0-3 Months",
    physical: [
      "Lifts head when on tummy",
      "Opens and closes hands",
      "Brings hands to mouth",
      "Moves arms and legs actively",
      "Holds head steady when upright"
    ],
    cognitive: [
      "Focuses on faces",
      "Follows moving objects with eyes",
      "Recognizes familiar people at a distance",
      "Starts to act bored if activity doesn't change"
    ],
    social: [
      "Begins to smile at people",
      "Can briefly calm themselves",
      "Tries to look at parents",
      "Gurgles or makes cooing sounds"
    ],
    communication: [
      "Makes cooing sounds",
      "Turns head toward sounds",
      "Begins to babble",
      "Cries in different ways for different needs"
    ]
  },

  // 4-6 months
  "4-6": {
    label: "4-6 Months",
    physical: [
      "Rolls over in both directions",
      "Sits without support",
      "Rocks back and forth on hands and knees",
      "Supports weight on legs when standing",
      "Transfers objects from one hand to another"
    ],
    cognitive: [
      "Looks around at things nearby",
      "Brings things to mouth",
      "Shows curiosity about things",
      "Tries to get things that are out of reach"
    ],
    social: [
      "Knows familiar faces",
      "Likes to play with others",
      "Responds to other people's emotions",
      "Likes to look at themselves in mirror"
    ],
    communication: [
      "Responds to sounds by making sounds",
      "Strings vowels together when babbling",
      "Responds to own name",
      "Makes sounds to show joy and displeasure"
    ]
  },

  // 7-9 months
  "7-9": {
    label: "7-9 Months",
    physical: [
      "Sits without support",
      "Gets to sitting position without help",
      "Crawls forward on belly",
      "Gets to hands-and-knees position",
      "Pulls to stand"
    ],
    cognitive: [
      "Watches the path of something as it falls",
      "Looks for things they see you hide",
      "Plays peek-a-boo",
      "Puts things in their mouth"
    ],
    social: [
      "May be afraid of strangers",
      "May be clingy with familiar adults",
      "Has favorite toys",
      "Understands 'no'"
    ],
    communication: [
      "Understands 'no'",
      "Makes many different sounds",
      "Copies sounds and gestures",
      "Uses fingers to point at things"
    ]
  },

  // 10-12 months
  "10-12": {
    label: "10-12 Months",
    physical: [
      "Pulls to stand and cruises along furniture",
      "Takes a few steps without holding on",
      "Stands alone",
      "Walks holding onto furniture",
      "May take first independent steps"
    ],
    cognitive: [
      "Explores things by shaking, banging, throwing",
      "Finds hidden things easily",
      "Looks at right picture when named",
      "Copies gestures"
    ],
    social: [
      "Shy or nervous with strangers",
      "Cries when mom or dad leaves",
      "Has favorite things and people",
      "Shows fear in some situations"
    ],
    communication: [
      "Responds to simple spoken requests",
      "Uses simple gestures like waving bye-bye",
      "Makes sounds with changes in tone",
      "Says 'mama' and 'dada' and exclamations"
    ]
  },

  // 13-18 months
  "13-18": {
    label: "13-18 Months",
    physical: [
      "Walks alone",
      "May walk up steps and run",
      "Pulls toys while walking",
      "Can help undress themselves",
      "Drinks from a cup"
    ],
    cognitive: [
      "Knows what ordinary things are for",
      "Points to get attention of others",
      "Shows interest in a doll or stuffed animal",
      "Points to one body part"
    ],
    social: [
      "Likes to hand things to others as play",
      "May have temper tantrums",
      "May be afraid of strangers",
      "Shows affection to familiar people"
    ],
    communication: [
      "Says several single words",
      "Says and shakes head 'no'",
      "Points to show others something interesting",
      "Tries to say words you say"
    ]
  },

  // 19-24 months
  "19-24": {
    label: "19-24 Months",
    physical: [
      "Runs and climbs",
      "Walks up and down stairs holding on",
      "Throws ball overhand",
      "Makes or copies straight lines",
      "Takes off some clothes"
    ],
    cognitive: [
      "Finds things even when hidden under covers",
      "Begins to sort shapes and colors",
      "Completes sentences in familiar books",
      "Plays simple make-believe games"
    ],
    social: [
      "Copies others, especially adults",
      "Gets excited when with other children",
      "Shows more independence",
      "Shows defiant behavior"
    ],
    communication: [
      "Points to things in a book when named",
      "Says sentences with 2-4 words",
      "Follows simple instructions",
      "Repeats words overheard in conversation"
    ]
  },

  // 2-3 years
  "24-36": {
    label: "2-3 Years",
    physical: [
      "Climbs well",
      "Runs easily",
      "Pedals a tricycle",
      "Walks up and down stairs one foot per step",
      "Kicks ball forward"
    ],
    cognitive: [
      "Makes mechanical toys work",
      "Plays make-believe with dolls and animals",
      "Sorts objects by shape and color",
      "Completes puzzles with 3-4 pieces"
    ],
    social: [
      "Imitates adults and playmates",
      "Shows affection for friends without prompting",
      "Takes turns in games",
      "Shows concern for crying friend"
    ],
    communication: [
      "Follows instructions with 2-3 steps",
      "Can name most familiar things",
      "Understands words like 'in,' 'on,' and 'under'",
      "Says first name, age, and sex"
    ]
  }
};

// Helper function to calculate baby's age in months
export const calculateBabyAgeInMonths = (birthDate) => {
  if (!birthDate) return 0;
  
  const birth = new Date(birthDate);
  const today = new Date();
  
  let months = (today.getFullYear() - birth.getFullYear()) * 12;
  months -= birth.getMonth();
  months += today.getMonth();
  
  // Adjust if the day hasn't passed yet this month
  if (today.getDate() < birth.getDate()) {
    months--;
  }
  
  return Math.max(0, months);
};

// Helper function to get age range key based on months
export const getAgeRangeKey = (ageInMonths) => {
  if (ageInMonths < 4) return "0-3";
  if (ageInMonths < 7) return "4-6";
  if (ageInMonths < 10) return "7-9";
  if (ageInMonths < 13) return "10-12";
  if (ageInMonths < 19) return "13-18";
  if (ageInMonths < 25) return "19-24";
  return "24-36";
};

// Helper function to get milestones for a specific age
export const getMilestonesForAge = (ageInMonths) => {
  const ageRangeKey = getAgeRangeKey(ageInMonths);
  return MILESTONE_DATA[ageRangeKey] || null;
};

// Helper function to get all milestone categories as flat array
export const getAllMilestonesForAge = (ageInMonths) => {
  const milestoneData = getMilestonesForAge(ageInMonths);
  if (!milestoneData) return [];
  
  return [
    ...milestoneData.physical.map(m => ({ text: m, category: 'Physical' })),
    ...milestoneData.cognitive.map(m => ({ text: m, category: 'Cognitive' })),
    ...milestoneData.social.map(m => ({ text: m, category: 'Social' })),
    ...milestoneData.communication.map(m => ({ text: m, category: 'Communication' }))
  ];
};

// Helper function to format age for display
export const formatBabyAge = (ageInMonths) => {
  if (ageInMonths < 12) {
    return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(ageInMonths / 12);
    const remainingMonths = ageInMonths % 12;
    
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }
};