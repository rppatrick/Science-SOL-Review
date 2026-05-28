import React, { useEffect, useMemo, useState } from "react";

const QUESTION_BANK = [
  {
    id: "g6_density",
    grade: "6",
    topic: "Physical Properties",
    standard: "Mass, volume, density",
    prompt: "A student wants to identify an unknown solid using mass and volume. Which physical property can be calculated from those two measurements?",
    reviewPrompt: "A rock has a mass of 24 g and a volume of 8 cm³. Which property helps identify it?",
    choices: ["Density", "Temperature", "Magnetism", "Color"],
    answer: 0,
    lesson: "Density is mass divided by volume. It helps identify substances because it is a characteristic property.",
    praise: "Nice work. You used the right property to identify matter."
  },
  {
    id: "g6_solubility",
    grade: "6",
    topic: "Physical Properties",
    standard: "Solubility",
    prompt: "A cup of water will not dissolve any more sugar, and some sugar sinks to the bottom. What does this show?",
    reviewPrompt: "After stirring salt into water, extra salt settles at the bottom. What does that mean?",
    choices: ["The solution is saturated", "The solution is evaporating", "The sugar changed into a gas", "The water froze"],
    answer: 0,
    lesson: "A saturated solution cannot dissolve any more solute at that temperature.",
    praise: "Correct. You spotted the point where the solution could not hold any more solute."
  },
  {
    id: "g6_physical_change",
    grade: "6",
    topic: "Physical vs. Chemical",
    standard: "Physical changes",
    prompt: "Which change is a physical change?",
    reviewPrompt: "Ice turning into liquid water is an example of which type of change?",
    choices: ["Melting ice", "Rusting iron", "Burning wood", "Baking a cake"],
    answer: 0,
    lesson: "A physical change changes form or state, but not the substance itself.",
    praise: "Yes. Melting changes state, not identity."
  },
  {
    id: "g6_variable",
    grade: "6",
    topic: "Scientific Investigation",
    standard: "Variables",
    prompt: "A student changes only the amount of salt in a water experiment. What is the independent variable?",
    reviewPrompt: "A student tests how salt changes boiling point by changing only the salt amount. What is changed on purpose?",
    choices: ["Amount of salt", "Boiling point", "Water temperature after the test", "The conclusion"],
    answer: 0,
    lesson: "The independent variable is the one the scientist changes on purpose.",
    praise: "Great. You identified the variable that was changed on purpose."
  },
  {
    id: "g6_hypothesis",
    grade: "6",
    topic: "Scientific Investigation",
    standard: "Hypothesis and conclusions",
    prompt: "What should a scientist do after collecting data from an experiment?",
    reviewPrompt: "A class finishes an investigation and sees the results. What should they do next?",
    choices: ["Use the data to support or reject the hypothesis", "Erase the data", "Change the question without looking at results", "Pick the answer that sounds best"],
    answer: 0,
    lesson: "Good conclusions are based on evidence, not guesses.",
    praise: "Nice. Science conclusions should follow the evidence."
  },
  {
    id: "g6_conduction",
    grade: "6",
    topic: "Thermal Energy",
    standard: "Heat transfer",
    prompt: "A metal spoon gets hot after sitting in a pan of soup. Which type of heat transfer is this?",
    reviewPrompt: "A spoon touches hot soup and starts to warm up. Which heat transfer is happening?",
    choices: ["Conduction", "Convection", "Radiation", "Evaporation"],
    answer: 0,
    lesson: "Conduction is heat transfer through direct contact.",
    praise: "Correct. Direct contact transfers thermal energy here."
  },
  {
    id: "g6_convection",
    grade: "6",
    topic: "Thermal Energy",
    standard: "Heat transfer",
    prompt: "Warm air rises and cool air sinks in a room. What type of heat transfer is this?",
    reviewPrompt: "In a pot of water, heated water rises while cooler water sinks. What is this called?",
    choices: ["Conduction", "Convection", "Radiation", "Compression"],
    answer: 1,
    lesson: "Convection is heat transfer by movement in a fluid such as air or water.",
    praise: "Nice. You found the rising-and-sinking pattern of convection."
  },
  {
    id: "g6_radiation",
    grade: "6",
    topic: "Thermal Energy",
    standard: "Heat transfer",
    prompt: "Energy from the Sun reaches Earth through empty space. Which heat transfer is this?",
    reviewPrompt: "Sunlight heats your skin even though space is a vacuum. Which heat transfer allows this?",
    choices: ["Radiation", "Conduction", "Convection", "Freezing"],
    answer: 0,
    lesson: "Radiation is the transfer of energy by electromagnetic waves and does not need matter.",
    praise: "Great. Radiation is the only heat transfer that works through a vacuum."
  },
  {
    id: "g6_temp_scale",
    grade: "6",
    topic: "Temperature Scales",
    standard: "Kelvin and absolute zero",
    prompt: "What is the official SI temperature scale used by scientists?",
    reviewPrompt: "Scientists often use a scale where 0 K is absolute zero. What is that scale?",
    choices: ["Kelvin", "Fahrenheit", "Celsius", "Rankine only"],
    answer: 0,
    lesson: "Kelvin is the official SI temperature scale.",
    praise: "Correct. Kelvin is the SI temperature scale."
  },
  {
    id: "g6_phase_change",
    grade: "6",
    topic: "Phase Change",
    standard: "Melting and freezing",
    prompt: "When liquid water becomes ice, what phase change occurs?",
    reviewPrompt: "A lake starts turning to ice in winter. What phase change is happening?",
    choices: ["Freezing", "Melting", "Vaporization", "Sublimation"],
    answer: 0,
    lesson: "Freezing changes a liquid into a solid.",
    praise: "Yes. Liquid to solid is freezing."
  },
  {
    id: "g6_phase_plateau",
    grade: "6",
    topic: "Phase Change",
    standard: "Phase change graphs",
    prompt: "On a phase change graph, what usually happens during a plateau?",
    reviewPrompt: "A temperature graph levels off while a substance changes state. What is happening?",
    choices: ["A phase change is occurring", "The substance disappears", "The temperature must keep rising", "The mass becomes zero"],
    answer: 0,
    lesson: "During a phase change, energy changes the state rather than the temperature.",
    praise: "Exactly. Plateaus usually mean a phase change is happening."
  },
  {
    id: "g6_weather_pressure",
    grade: "6",
    topic: "Weather",
    standard: "Air pressure and wind",
    prompt: "Wind usually flows from areas of ____.",
    reviewPrompt: "Cool, dense air moves into an area where warm air rises. Wind moves from where to where?",
    choices: ["High pressure to low pressure", "Low pressure to high pressure", "Cold to hot by color", "East to west only"],
    answer: 0,
    lesson: "Air moves from higher pressure toward lower pressure.",
    praise: "Correct. Wind follows the pressure difference."
  },
  {
    id: "g6_condensation",
    grade: "6",
    topic: "Weather",
    standard: "Water cycle",
    prompt: "What process causes dew to form on grass in the morning?",
    reviewPrompt: "Water vapor cools and forms tiny drops on a cold car windshield. What is this?",
    choices: ["Condensation", "Evaporation", "Precipitation", "Runoff"],
    answer: 0,
    lesson: "Condensation happens when water vapor cools and becomes liquid water.",
    praise: "Nice. Dew forms when water vapor condenses."
  },
  {
    id: "g6_front_cold",
    grade: "6",
    topic: "Weather",
    standard: "Fronts",
    prompt: "A cold air mass moves under a warm air mass and forces it up. What front is this?",
    reviewPrompt: "Warm air is pushed upward quickly because cold air slides underneath it. What type of front is forming?",
    choices: ["Cold front", "Warm front", "Stationary front", "Occluded front"],
    answer: 0,
    lesson: "A cold front forms when cold air replaces warm air.",
    praise: "Correct. That description matches a cold front."
  },
  {
    id: "g6_atmosphere",
    grade: "6",
    topic: "Atmosphere",
    standard: "Earth's atmosphere",
    prompt: "What is Earth’s atmosphere?",
    reviewPrompt: "The layer of gases surrounding Earth is called what?",
    choices: ["The layer of gases around Earth", "A layer of rock under the crust", "A belt of asteroids", "The ocean floor"],
    answer: 0,
    lesson: "Earth’s atmosphere is the layer of gases around our planet.",
    praise: "Yes. That is Earth’s atmosphere."
  },
  {
    id: "g7_solar_system_center",
    grade: "7",
    topic: "Solar System",
    standard: "Solar system structure",
    prompt: "What is at the center of our solar system?",
    reviewPrompt: "Planets orbit around the star at the center of our solar system. What is it?",
    choices: ["The Sun", "Earth", "The Moon", "Mars"],
    answer: 0,
    lesson: "The Sun is the center of our solar system, and planets revolve around it.",
    praise: "Great. The Sun is the center of our solar system."
  },
  {
    id: "g7_gravity_orbit",
    grade: "7",
    topic: "Gravity",
    standard: "Gravity and orbit",
    prompt: "What keeps the planets in orbit around the Sun?",
    reviewPrompt: "Planets stay in their paths because of what force?",
    choices: ["The Sun’s gravity", "Wind", "Moonlight", "Friction"],
    answer: 0,
    lesson: "Gravity is the force of attraction that keeps planets orbiting.",
    praise: "Nice. Gravity keeps the planets in orbit."
  },
  {
    id: "g7_mass_gravity",
    grade: "7",
    topic: "Gravity",
    standard: "Factors affecting gravity",
    prompt: "Which factor increases gravitational force most?",
    reviewPrompt: "Two objects move closer together. What happens to the gravitational force?",
    choices: ["More mass and less distance increase gravity", "Less mass and more distance increase gravity", "Only color matters", "Only shape matters"],
    answer: 0,
    lesson: "Gravity gets stronger when mass increases and distance decreases.",
    praise: "Correct. Mass and distance affect gravity."
  },
  {
    id: "g7_lunar_cycle",
    grade: "7",
    topic: "Moon Phases",
    standard: "Lunar cycle",
    prompt: "How long does the lunar cycle take to complete?",
    reviewPrompt: "The Moon repeats its phases in about how many days?",
    choices: ["About 28 days", "About 7 days", "About 365 days", "About 100 days"],
    answer: 0,
    lesson: "The lunar cycle takes about 28 days.",
    praise: "Yes. The Moon’s cycle is about 28 days long."
  },
  {
    id: "g7_planet_characteristics",
    grade: "7",
    topic: "Solar System",
    standard: "Planets",
    prompt: "Which planet is known as the largest planet in our solar system?",
    reviewPrompt: "A giant planet with a famous storm is being described. Which planet is it?",
    choices: ["Jupiter", "Venus", "Earth", "Mercury"],
    answer: 0,
    lesson: "Jupiter is the largest planet in the solar system.",
    praise: "Correct. Jupiter is the biggest planet."
  },
  {
    id: "g7_rotation_revolution",
    grade: "7",
    topic: "Earth Science",
    standard: "Rotation and revolution",
    prompt: "What causes day and night on Earth?",
    reviewPrompt: "Earth spins once every day. That spinning causes what?",
    choices: ["Rotation", "Revolution", "Erosion", "Condensation"],
    answer: 0,
    lesson: "Rotation is Earth spinning on its axis, which causes day and night.",
    praise: "Nice. Rotation causes day and night."
  },
  {
    id: "g7_weather_high_low",
    grade: "7",
    topic: "Weather",
    standard: "Pressure systems",
    prompt: "Which weather is most likely under high pressure?",
    reviewPrompt: "A barometer rises and the sky clears. What weather is likely?",
    choices: ["Sunny and clear", "Cloudy and stormy", "Hurricane conditions", "Heavy fog every time"],
    answer: 0,
    lesson: "High pressure usually brings sinking air, clear skies, and calmer winds.",
    praise: "Great. High pressure is usually linked to clear weather."
  },
  {
    id: "g7_water_cycle",
    grade: "7",
    topic: "Water Cycle",
    standard: "Evaporation and condensation",
    prompt: "Water vapor cools and turns back into liquid droplets in the water cycle. What is this step?",
    reviewPrompt: "Clouds form when water vapor cools and becomes liquid drops. What step is that?",
    choices: ["Condensation", "Evaporation", "Infiltration", "Transpiration"],
    answer: 0,
    lesson: "Condensation changes water vapor into liquid water droplets.",
    praise: "Correct. That is condensation."
  },
  {
    id: "g8_speed",
    grade: "8",
    topic: "Force & Motion",
    standard: "Speed",
    prompt: "What is speed?",
    reviewPrompt: "A runner goes 20 meters in 4 seconds. What is being measured?",
    choices: ["Distance divided by time", "Mass divided by volume", "Force times mass", "Temperature change"],
    answer: 0,
    lesson: "Speed is the distance traveled divided by time.",
    praise: "Nice. Speed is distance over time."
  },
  {
    id: "g8_velocity",
    grade: "8",
    topic: "Force & Motion",
    standard: "Velocity",
    prompt: "What makes velocity different from speed?",
    reviewPrompt: "A car moves at 50 m/s east. What extra part makes this velocity, not just speed?",
    choices: ["Direction", "Color", "Mass", "Temperature"],
    answer: 0,
    lesson: "Velocity includes both speed and direction.",
    praise: "Correct. Direction is what makes it velocity."
  },
  {
    id: "g8_acceleration",
    grade: "8",
    topic: "Force & Motion",
    standard: "Acceleration",
    prompt: "Which action is acceleration?",
    reviewPrompt: "A skateboarder speeds up, slows down, or turns around. What is that called?",
    choices: ["A change in speed or direction", "A mass measurement", "A type of force only", "A form of energy storage"],
    answer: 0,
    lesson: "Acceleration is any change in speed or direction.",
    praise: "Great. Acceleration means change in motion."
  },
  {
    id: "g8_inertia",
    grade: "8",
    topic: "Force & Motion",
    standard: "Newton's First Law",
    prompt: "What is inertia?",
    reviewPrompt: "A hockey puck keeps sliding until friction stops it. What tendency is this?",
    choices: ["Resistance to a change in motion", "The pull of electricity", "A type of density", "Heat moving from hot to cold"],
    answer: 0,
    lesson: "Inertia is the tendency of objects to resist changes in motion.",
    praise: "Yes. Inertia is resistance to a change in motion."
  },
  {
    id: "g8_newton2",
    grade: "8",
    topic: "Force & Motion",
    standard: "Newton's Second Law",
    prompt: "Newton’s Second Law is best represented by which formula?",
    reviewPrompt: "Force, mass, and acceleration are related by which equation?",
    choices: ["F = ma", "D = m/v", "P = t / d", "K = C + 273"],
    answer: 0,
    lesson: "Newton’s Second Law says force equals mass times acceleration.",
    praise: "Correct. F = ma is Newton’s Second Law."
  },
  {
    id: "g8_newton3",
    grade: "8",
    topic: "Force & Motion",
    standard: "Newton's Third Law",
    prompt: "Newton’s Third Law says that for every action there is an equal and opposite ____.",
    reviewPrompt: "A rocket pushes gases backward. What pushes the rocket forward?",
    choices: ["Reaction", "Rotation", "Friction", "Density"],
    answer: 0,
    lesson: "Action and reaction forces come in equal and opposite pairs.",
    praise: "Great. That is Newton’s Third Law."
  },
  {
    id: "g8_conductors",
    grade: "8",
    topic: "Thermal Energy",
    standard: "Conductors and insulators",
    prompt: "Why do pots often have wooden or rubber handles?",
    reviewPrompt: "A pan handle is made of rubber instead of metal. Why?",
    choices: ["Rubber is a poor conductor", "Rubber is heavier than metal", "Rubber makes heat faster", "Rubber is magnetic"],
    answer: 0,
    lesson: "Insulators slow down thermal energy transfer.",
    praise: "Nice. The handle stays cooler because it is an insulator."
  },
  {
    id: "g8_atom_electrons",
    grade: "8",
    topic: "Atoms",
    standard: "Atomic structure",
    prompt: "Which atomic particle is found outside the nucleus?",
    reviewPrompt: "In a model of an atom, which particle is in the electron cloud?",
    choices: ["Electron", "Proton", "Neutron", "Nucleus"],
    answer: 0,
    lesson: "Electrons are located in the electron cloud outside the nucleus.",
    praise: "Correct. Electrons are outside the nucleus."
  },
  {
    id: "g8_atomic_number",
    grade: "8",
    topic: "Atoms",
    standard: "Periodic table",
    prompt: "What does an element’s atomic number tell you?",
    reviewPrompt: "The number at the top of an element box tells you what?",
    choices: ["Number of protons", "Number of neutrons only", "Number of bonds", "Number of molecules"],
    answer: 0,
    lesson: "Atomic number equals the number of protons.",
    praise: "Yes. Atomic number tells the number of protons."
  },
  {
    id: "g8_bonding",
    grade: "8",
    topic: "Atoms",
    standard: "Bonding",
    prompt: "Why do atoms bond with each other?",
    reviewPrompt: "Atoms form bonds because they want what in their outer shell?",
    choices: ["To complete their valence shell", "To become colder", "To lose all electrons", "To change into atoms"],
    answer: 0,
    lesson: "Atoms bond to become more stable by filling their valence shell.",
    praise: "Great. Completing the valence shell is the big idea."
  },
  {
    id: "g8_chemical_change",
    grade: "8",
    topic: "Matter",
    standard: "Chemical changes",
    prompt: "Which is a clue that a chemical reaction may have happened?",
    reviewPrompt: "A liquid changes color and makes bubbles. What does that suggest?",
    choices: ["Temperature change or gas formation", "A new shape only", "A different label", "A longer pencil"],
    answer: 0,
    lesson: "Unexpected color change, temperature change, gas formation, or precipitate can signal a chemical change.",
    praise: "Nice. You recognized a common clue of chemical change."
  }
];

const STORAGE_KEY = "sol_science_review_state_v1";

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatGradeLabel(grade) {
  return `Grade ${grade}`;
}

function buildQuiz(prevState, preferredGrades) {
  const bank = QUESTION_BANK.filter((q) => preferredGrades.length === 0 || preferredGrades.includes(q.grade));
  const missedIds = new Set(prevState.missedIds || []);
  const seenIds = new Set(prevState.seenIds || []);

  const missed = bank.filter((q) => missedIds.has(q.id));
  const unseen = bank.filter((q) => !seenIds.has(q.id) && !missedIds.has(q.id));
  const remaining = bank.filter((q) => !missedIds.has(q.id) && seenIds.has(q.id));

  const quiz = [];
  const target = Math.min(15, bank.length);

  // Recycle missed questions first.
  shuffle(missed).slice(0, 5).forEach((q) => quiz.push({ ...q, mode: "review" }));
  shuffle(unseen).slice(0, Math.max(0, 10 - quiz.length)).forEach((q) => quiz.push({ ...q, mode: "new" }));
  shuffle(remaining).forEach((q) => {
    if (quiz.length < target) quiz.push({ ...q, mode: "new" });
  });

  // If the bank is smaller than 15, just fill with any remaining.
  if (quiz.length < target) {
    shuffle(bank).forEach((q) => {
      if (quiz.length < target && !quiz.some((x) => x.id === q.id)) quiz.push({ ...q, mode: "new" });
    });
  }

  return shuffle(quiz).slice(0, target);
}

function getStoredState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export default function App() {
  const [preferredGrades, setPreferredGrades] = useState(["6", "7", "8"]);
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [missedIds, setMissedIds] = useState([]);
  const [seenIds, setSeenIds] = useState([]);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [status, setStatus] = useState("ready");
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const stored = getStoredState();
    if (stored) {
      setMissedIds(stored.missedIds || []);
      setSeenIds(stored.seenIds || []);
      setCompletedRounds(stored.completedRounds || 0);
      setQuizHistory(stored.quizHistory || []);
      setPreferredGrades(stored.preferredGrades || ["6", "7", "8"]);
    }
    const next = buildQuiz(stored || { missedIds: [], seenIds: [] }, preferredGrades);
    setQuiz(next);
    setStatus("quiz");
  }, []);

  useEffect(() => {
    saveState({ missedIds, seenIds, completedRounds, quizHistory, preferredGrades });
  }, [missedIds, seenIds, completedRounds, quizHistory, preferredGrades]);

  const current = quiz[index];
  const progress = quiz.length ? Math.round(((index + (feedback ? 1 : 0)) / quiz.length) * 100) : 0;
  const currentTopicCount = useMemo(() => {
    const map = {};
    quiz.forEach((q) => {
      map[q.topic] = (map[q.topic] || 0) + 1;
    });
    return map;
  }, [quiz]);

  const startNewQuiz = () => {
    const next = buildQuiz({ missedIds, seenIds }, preferredGrades);
    setQuiz(next);
    setIndex(0);
    setSelected(null);
    setFeedback(null);
    setScore(0);
    setStatus("quiz");
  };

  const handleChoice = (choiceIndex) => {
    if (!current || feedback) return;
    setSelected(choiceIndex);
    const isCorrect = choiceIndex === current.answer;
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback({ correct: true, text: current.praise || "Nice work!", lesson: null });
      setMissedIds((prev) => prev.filter((id) => id !== current.id));
    } else {
      setFeedback({ correct: false, text: "Not quite yet.", lesson: current.lesson });
      setMissedIds((prev) => Array.from(new Set([...prev, current.id])));
    }
    setSeenIds((prev) => Array.from(new Set([...prev, current.id])));
  };

  const nextQuestion = () => {
    const isLast = index >= quiz.length - 1;
    const updatedHistory = [...quizHistory, {
      date: new Date().toLocaleDateString(),
      score: score + (selected === current.answer ? 1 : 0),
      total: quiz.length,
      grades: preferredGrades.join(", ")
    }];
    setQuizHistory(updatedHistory);
    setCompletedRounds((r) => r + 1);

    if (isLast) {
      setStatus("results");
      setFeedback(null);
      setSelected(null);
      return;
    }

    setIndex((i) => i + 1);
    setSelected(null);
    setFeedback(null);
  };

  const toggleGrade = (grade) => {
    setPreferredGrades((prev) => {
      const exists = prev.includes(grade);
      const next = exists ? prev.filter((g) => g !== grade) : [...prev, grade];
      return next.length ? next : ["6", "7", "8"];
    });
  };

  const buildReviewRound = () => {
    const missed = QUESTION_BANK.filter((q) => missedIds.includes(q.id));
    const reviewDeck = shuffle(missed).slice(0, 15).map((q) => ({ ...q, mode: "review" }));
    if (!reviewDeck.length) return startNewQuiz();
    setQuiz(reviewDeck);
    setIndex(0);
    setSelected(null);
    setFeedback(null);
    setScore(0);
    setStatus("quiz");
  };

  const currentPrompt = current?.mode === "review" ? current?.reviewPrompt || current?.prompt : current?.prompt;
  const title = current?.mode === "review" ? "Review Round" : "SOL Question";

  if (status === "results") {
    const lastScore = score;
    const mastery = quiz.length ? Math.round((lastScore / quiz.length) * 100) : 0;
    const missedQuestions = quiz.filter((q) => q.answer !== undefined && !q._answeredCorrectly);
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Quiz complete</p>
                <h1 className="mt-2 text-3xl md:text-5xl font-bold">You scored {lastScore} / {quiz.length}</h1>
                <p className="mt-3 text-slate-600 max-w-2xl">
                  This app automatically brings back missed SOL ideas in a new format on the next round, so students keep seeing the same concepts with fresh wording.
                </p>
              </div>
              <div className="rounded-2xl bg-indigo-50 px-5 py-4 border border-indigo-100">
                <div className="text-sm text-indigo-700 font-semibold">Mastery</div>
                <div className="text-4xl font-black text-indigo-900">{mastery}%</div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="font-semibold">Next step</div>
                <p className="mt-2 text-sm text-slate-600">
                  {missedIds.length
                    ? "Run a review round to see missed questions again in a different format."
                    : "You are ready for a fresh 15-question quiz from the same SOL bank."}
                </p>
                <button
                  onClick={missedIds.length ? buildReviewRound : startNewQuiz}
                  className="mt-4 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-white font-medium hover:bg-slate-700"
                >
                  {missedIds.length ? "Review missed questions" : "Start another quiz"}
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="font-semibold">Question bank settings</div>
                <p className="mt-2 text-sm text-slate-600">Choose which grades to mix into the next test.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["6", "7", "8"].map((g) => (
                    <button
                      key={g}
                      onClick={() => toggleGrade(g)}
                      className={`rounded-full px-3 py-1.5 text-sm font-semibold border ${preferredGrades.includes(g) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-300"}`}
                    >
                      {formatGradeLabel(g)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <h2 className="text-lg font-semibold">Recent rounds</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {quizHistory.slice().reverse().slice(0, 6).map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-white border border-slate-200 p-4 text-sm">
                    <div className="font-semibold">{item.date}</div>
                    <div className="text-slate-600">Score: {item.score}/{item.total}</div>
                    <div className="text-slate-500">Mix: {item.grades}</div>
                  </div>
                ))}
                {!quizHistory.length && <div className="text-sm text-slate-500">No history yet.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xl">Loading question bank...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">SOL Science Review Engine</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-black tracking-tight">15-question adaptive quiz with instant feedback</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Built from the uploaded Virginia SOL review materials and arranged so missed ideas come back later in a new wrapper. Students get praise for correct answers and a short mini-lesson when they miss one.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-4">
            <div className="text-sm text-slate-500">Current score</div>
            <div className="text-3xl font-black">{score}/{quiz.length}</div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-5 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-bold">{title}</span>
                <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-bold">{formatGradeLabel(current.grade)}</span>
                <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-bold">{current.topic}</span>
              </div>
              <div className="text-sm text-slate-500">Question {index + 1} of {quiz.length}</div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${Math.min(100, progress)}%` }} />
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 border border-slate-200 p-5 md:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Question</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-snug">{currentPrompt}</h2>
            </div>

            <div className="mt-6 grid gap-3">
              {current.choices.map((choice, i) => {
                const isPicked = selected === i;
                const showCorrect = feedback && i === current.answer;
                const showWrong = feedback && isPicked && i !== current.answer;
                return (
                  <button
                    key={choice}
                    onClick={() => handleChoice(i)}
                    disabled={!!feedback}
                    className={`text-left rounded-2xl border px-5 py-4 transition-all duration-150 ${
                      showCorrect
                        ? "border-emerald-500 bg-emerald-50"
                        : showWrong
                        ? "border-rose-500 bg-rose-50"
                        : isPicked
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
                    } ${feedback ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 grid h-7 w-7 place-items-center rounded-full text-sm font-bold ${showCorrect ? "bg-emerald-600 text-white" : showWrong ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-700"}`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div className="text-base md:text-lg font-medium">{choice}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className={`mt-6 rounded-2xl border p-5 ${feedback.correct ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
                <div className="text-lg font-bold">{feedback.correct ? "Correct!" : "Mini lesson"}</div>
                <p className="mt-2 text-slate-700">{feedback.correct ? feedback.text : feedback.lesson}</p>
                {!feedback.correct && (
                  <p className="mt-2 text-sm text-slate-600">
                    Try this idea on the next question: {current.lesson}
                  </p>
                )}
                <button
                  onClick={nextQuestion}
                  className="mt-4 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-white font-medium hover:bg-slate-700"
                >
                  {index === quiz.length - 1 ? "See results" : "Next question"}
                </button>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-5 md:p-6">
              <h3 className="text-xl font-bold">Quiz controls</h3>
              <p className="mt-2 text-sm text-slate-600">These controls make it easy to repeat the quiz with new material or new grade-level mixes.</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {["6", "7", "8"].map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGrade(g)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold border ${preferredGrades.includes(g) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-300"}`}
                  >
                    {formatGradeLabel(g)}
                  </button>
                ))}
              </div>

              <button
                onClick={startNewQuiz}
                className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-700"
              >
                Start a fresh 15-question quiz
              </button>

              <button
                onClick={buildReviewRound}
                className="mt-3 w-full rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-indigo-700 font-semibold hover:bg-indigo-100"
              >
                Review missed questions in a new format
              </button>
            </div>

            <div className="rounded-3xl bg-white shadow-xl border border-slate-200 p-5 md:p-6">
              <h3 className="text-xl font-bold">What this app does</h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-600 leading-6">
                <li>• Generates a 15-question multiple-choice SOL test.</li>
                <li>• Gives praise immediately when students are correct.</li>
                <li>• Shows a mini-lesson when students miss a question.</li>
                <li>• Reuses missed questions later with a different prompt style.</li>
                <li>• Supports repeating the quiz with new grade-level mixes.</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-slate-900 text-white shadow-xl p-5 md:p-6">
              <h3 className="text-xl font-bold">Topic mix in this round</h3>
              <div className="mt-3 space-y-2 text-sm">
                {Object.entries(currentTopicCount)
                  .sort((a, b) => b[1] - a[1])
                  .map(([topic, count]) => (
                    <div key={topic} className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
                      <span>{topic}</span>
                      <span className="font-bold">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
