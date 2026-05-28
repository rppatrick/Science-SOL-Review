# SOL Science Review

An interactive, adaptive React-based quiz application for Virginia Standards of Learning (SOL) science test preparation. Students work through 15-question quizzes with instant feedback, mini-lessons, and automatic recycling of missed questions.

## Features

- **40 SOL Science Questions**: Covering Grades 6, 7, and 8 standards
- **Adaptive Quiz System**: Generates random 15-question quizzes with preference for missed questions on next round
- **Instant Feedback**: Students receive praise for correct answers and mini-lessons for incorrect ones
- **Review Mode**: Reuses missed questions with alternative prompt wording
- **Grade Filtering**: Select which grade levels to include in each quiz
- **Score History**: Tracks recent quiz results with dates and grade mixes
- **Progress Tracking**: Visual progress bar and real-time score updates
- **Persistent Storage**: Uses localStorage to save quiz state and history
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Tailwind Styling**: Modern, accessible UI with smooth transitions

## Topics Covered

### Grade 6
- Physical Properties (Density, Solubility)
- Physical vs. Chemical Changes
- Scientific Investigation (Variables, Hypothesis)
- Thermal Energy (Conduction, Convection, Radiation)
- Temperature Scales
- Phase Change
- Weather (Pressure, Condensation, Fronts)
- Atmosphere

### Grade 7
- Solar System Structure
- Gravity and Orbits
- Moon Phases and Lunar Cycle
- Planets
- Rotation and Revolution
- Weather Systems (High/Low Pressure)
- Water Cycle

### Grade 8
- Force & Motion (Speed, Velocity, Acceleration, Inertia)
- Newton's Laws of Motion
- Thermal Energy (Conductors and Insulators)
- Atomic Structure (Electrons, Atomic Number)
- Bonding
- Chemical Changes

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rppatrick/Science-SOL-Review.git
cd Science-SOL-Review
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
Science-SOL-Review/
├── src/
│   ├── App.jsx           # Main quiz component
│   ├── main.jsx          # Entry point
│   ├── App.css           # Application styles
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # Project dependencies
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Usage

1. **Starting a Quiz**: Click "Start a fresh 15-question quiz" to begin
2. **Selecting an Answer**: Click on any answer choice
3. **Viewing Feedback**: After answering, you'll see whether you were correct and why
4. **Reviewing Missed Questions**: After completing a quiz, click "Review missed questions in a new format" to see those questions again with different wording
5. **Adjusting Grade Levels**: Use the grade buttons to include/exclude specific grade levels from future quizzes
6. **Checking History**: View recent quiz scores and grade mixes on the results screen

## How It Works

The app uses a smart adaptive algorithm:

1. **First Round**: 15 random questions from selected grades
2. **Tracking**: Records which questions were missed and seen
3. **Next Round**: Up to 5 missed questions appear first (in "review" mode with alternative wording), then fills remaining slots with unseen questions
4. **Score Calculation**: Displays percentage mastery based on total correct/total questions

Quiz state is persisted to localStorage, so progress is maintained even after closing the browser.

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **localStorage API**: Browser-based data persistence

## Customization

### Adding More Questions

Edit `src/App.jsx` and add new objects to the `QUESTION_BANK` array:

```javascript
{
  id: "unique_id",
  grade: "6",  // or "7", "8"
  topic: "Topic Name",
  standard: "SOL Standard Description",
  prompt: "Question text for first encounter",
  reviewPrompt: "Alternative wording for review round",
  choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
  answer: 0,  // Index of correct answer (0-3)
  lesson: "Explanation why this is correct",
  praise: "Encouragement message"
}
```

### Customizing Styling

Edit `tailwind.config.js` to adjust colors, spacing, or other design tokens. All component styling uses Tailwind utility classes.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for educational purposes.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Support

For questions or issues, please open a GitHub issue or contact the project maintainer.

---

**Built for Virginia SOL Science Test Preparation**
