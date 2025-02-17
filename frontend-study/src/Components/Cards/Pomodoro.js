import React, { useEffect, useState } from "react";
import kost from "../Sounds/track1.mp3";
import kost2 from "../Sounds/track2.mp3";
import kost3 from "../Sounds/track3.mp3";
import kost4 from "../Sounds/track4.mp3";
import kost5 from "../Sounds/track5.mp3";
import kost6 from "../Sounds/track6.mp3";
import kost7 from "../Sounds/track7.mp3";

const CircularProgress = ({ progress }) => (
  <div className="relative w-48 h-48">
    <svg className="w-full h-full transform -rotate-90">
      <circle
        className="text-white/10"
        strokeWidth="8"
        stroke="currentColor"
        fill="transparent"
        r="70"
        cx="96"
        cy="96"
      />
      <circle
        className="text-green-500 transition-all duration-300"
        strokeWidth="8"
        strokeDasharray={440}
        strokeDashoffset={440 * (1 - progress)}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="70"
        cx="96"
        cy="96"
      />
    </svg>
  </div>
);
const studyTracks = [
  {
    id: 1,
    name: "Korean Drama Study Group OST",
    url: kost, // Update with your actual file paths
  },
  {
    id: 2,
    name: "Lofi Beats",
    url: kost2,
  },
  {
    id: 3,
    name: "Nature Sounds",
    url: kost3,
  },
  {
    id: 4,
    name: "Piano Focus",
    url: kost4,
  },
  {
    id: 5,
    name: "Deep Focus",
    url: kost5,
  },
  {
    id: 6,
    name: "Ambient Flow",
    url: kost6,
  },
  {
    id: 7,
    name: "Study Beats",
    url: kost7,
  },
];

const PomodoroModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isBreak, setIsBreak] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let newAudio = null;
    if (soundEnabled && isActive) {
      newAudio = new Audio(studyTracks[currentTrack].url);
      newAudio.loop = true;
      newAudio.preload = "auto";
      newAudio.play().catch((error) => {
        console.log("Error playing study track:", error);
        setSoundEnabled(false);
      });
      setAudio(newAudio);
    }

    return () => {
      if (newAudio) {
        newAudio.pause();
        newAudio.src = "";
        newAudio.load();
      }
    };
  }, [soundEnabled, isActive, currentTrack]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);

      // Stop the study track if it's playing
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.load();
        setAudio(null);
      }

      if (!isBreak) {
        if (tasks.length > 0) {
          setTasks(
            tasks.map((task) =>
              !task.completed
                ? { ...task, pomodoros: task.pomodoros + 1 }
                : task
            )
          );
        }
        setCompletedPomodoros((prev) => prev + 1);
        setIsBreak(true);
        setTimeLeft(breakTime * 60);
        window.alert("Time for a break!");
      } else {
        setIsBreak(false);
        setTimeLeft(focusTime * 60);
        window.alert("Break is over! Ready to focus?");
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, breakTime, focusTime, isBreak, tasks, audio]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        pomodoros: 0,
      },
    ]);
    setNewTask("");
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const nextTrack = () => {
    if (audio) {
      audio.pause();
      audio.src = "";
      audio.load();
    }
    setCurrentTrack((prev) => (prev + 1) % studyTracks.length);
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.load();
      }
    };
  }, [audio]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - timeLeft / (isBreak ? breakTime * 60 : focusTime * 60);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(focusTime * 60);
    setIsBreak(false);
    setTasks([]); // Clear all tasks
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">
              {isBreak ? "Break Time" : "Focus Time"}
            </h3>
            <p className="text-sm text-white/60">
              Completed Pomodoros: {completedPomodoros}
            </p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="text-center mb-6">
          {/* Timer Display */}
          <div className="relative w-48 h-48 mx-auto mb-4">
            <CircularProgress progress={progress} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-white">
                {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}
              </span>
            </div>
          </div>

          {/* Task Management */}
          <form onSubmit={addTask} className="mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 
                         text-white placeholder-white/40 mb-2
                         focus:border-white/20 focus:outline-none"
            />
          </form>

          {/* Task List */}
          <div className="max-h-40 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-2 rounded-lg mb-2
                            ${
                              task.completed ? "bg-green-500/10" : "bg-white/5"
                            }`}
              >
                <div className="flex items-center flex-1 mr-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="mr-2"
                  />
                  <span
                    className={`text-sm ${
                      task.completed
                        ? "line-through text-white/40"
                        : "text-white"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">
                    {task.pomodoros} 🍅
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-white/40 hover:text-white/60 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Timer Controls */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-green-500 
                         rounded-xl text-white font-semibold
                         hover:opacity-90 transition-opacity duration-200"
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-white/10 rounded-xl text-white font-semibold
                         hover:bg-white/20 transition-all duration-200"
            >
              Reset
            </button>
          </div>

          {/* Music Controls */}
          <div className="mb-4">
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-2 mb-2">
              <span className="text-white/60 text-sm">
                {soundEnabled ? studyTracks[currentTrack].name : "Music Off"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={nextTrack}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  disabled={!soundEnabled}
                >
                  ⏭️
                </button>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {soundEnabled ? "🔊" : "🔇"}
                </button>
              </div>
            </div>
          </div>

          {/* Timer Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm block mb-2">
                Focus Time (min)
              </label>
              <input
                type="number"
                value={focusTime}
                onChange={(e) => {
                  const newTime = parseInt(e.target.value) || 25;
                  setFocusTime(newTime);
                  if (!isActive && !isBreak) {
                    setTimeLeft(newTime * 60);
                  }
                }}
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 
                           text-white text-center"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm block mb-2">
                Break Time (min)
              </label>
              <input
                type="number"
                value={breakTime}
                onChange={(e) => {
                  const newTime = parseInt(e.target.value) || 5;
                  setBreakTime(newTime);
                  if (!isActive && isBreak) {
                    setTimeLeft(newTime * 60);
                  }
                }}
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 
                           text-white text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Pomodoro = () => {
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);

  return (
    <div className="h-full">
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 
    hover:border-white/20 transition-all duration-300 cursor-pointer
    hover:transform hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">🍅</div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Pomodoro Timer
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-white/80">
            Break down your study sessions into focused intervals:
          </p>
          <ul className="text-sm list-disc list-inside text-white/70 space-y-1 ml-2">
            <li>25 minutes of focused work</li>
            <li>5 minutes short break</li>
            <li>Longer break after 4 sessions</li>
          </ul>
          <div className="pt-3">
            <button
              onClick={() => setIsPomodoroOpen(true)}
              className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-green-500 
        rounded-lg text-white font-semibold
        hover:opacity-90 transition-opacity duration-200
        shadow-lg shadow-yellow-500/20"
            >
              Start Timer
            </button>
          </div>
        </div>
      </div>
      <PomodoroModal 
        isOpen={isPomodoroOpen} 
        onClose={() => setIsPomodoroOpen(false)} 
      />
    </div>
  );
};
