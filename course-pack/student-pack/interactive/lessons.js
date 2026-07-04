// lessons.js – course lesson definitions for the interactive IDE
// Each entry has: id, title, and starterCode (the Python starter file contents).
// Add new lessons by appending to the LESSONS array.

const LESSONS = [
  {
    id: "lesson-01",
    title: "1 · Mission Control",
    goal: "Create a simple tribute profile and practise variables, types, reassignment, and printed output.",
    story: "The mission console wakes up and asks the student to introduce a crew member before the arena simulation starts.",
    theory: [
      {
        heading: "Variables & types",
        explanation: "A variable is a named box that stores a value. Python figures out the type (text, whole number, decimal, true/false) from what you put in it, and you can change the value later by reassigning it.",
        code: `participant_name = "Ari"
district = 4
score = 12.5
is_active = True

score = score + 1.5
print(participant_name, district, score, is_active)`
      }
    ],
    quiz: [
      {
        question: "What best describes a variable in Python?",
        options: [
          "A named box that stores a value, which can change later",
          "A command that prints text to the screen",
          "A fixed value that can never be changed once set",
          "A type of loop that repeats a block of code"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 1 starter: Mission Control

print("Arena Mission Console")

# TODO 1: Create variables
participant_name = ""
district = 0
score = 0.0
is_active = False

# TODO 2: Update score after a positive event
# Example idea: score = score + 1.5

# TODO 3: Print final status report
# print("Name:", participant_name)
# print("District:", district)
# print("Score:", score)
# print("Active:", is_active)

print("TODO: complete Lesson 1 starter tasks.")
`
  },
  {
    id: "lesson-02",
    title: "2 · Dialogue Engine",
    goal: "Unlock the gate by collecting clues, converting input, and using a simple decision.",
    story: "A sealed terminal is waiting for the right pair of clues, and the student has to calculate the unlock code.",
    theory: [
      {
        heading: "Input + conversion",
        explanation: "input() always returns text (a string), even if the user types a number. Convert it with int() or float() before you do math with it.",
        code: `age_text = input("Age: ")
age = int(age_text)
print(age + 1)`
      },
      {
        heading: "Doing math with converted input",
        explanation: "Once two inputs are converted to numbers, you can combine them with ordinary arithmetic to compute a result, like a score used to unlock something.",
        code: `clue_a = int(input("Enter clue A: "))
clue_b = int(input("Enter clue B: "))
unlock_score = clue_a + (clue_b * 2)
print(unlock_score)`
      }
    ],
    quiz: [
      {
        question: "Why do you need to convert the result of input() before doing math with it?",
        options: [
          "Because input() always returns text, even if the user types numbers",
          "Because input() only works with numbers already",
          "Because Python cannot read text from the keyboard",
          "Because conversion makes the program run faster"
        ],
        correctIndex: 0
      },
      {
        question: "After clue_a = int(clue_a_text), what type is clue_a?",
        options: [
          "An integer (whole number)",
          "Still text (a string)",
          "A list",
          "A boolean (True/False)"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 2 starter: Dialogue Engine

print("Escape Room Terminal")

# TODO 1: Collect clues from user
clue_a_text = input("Enter clue A (number): ")
clue_b_text = input("Enter clue B (number): ")

# TODO 2: Convert to integers
clue_a = 0
clue_b = 0

# TODO 3: Compute unlock score
unlock_score = 0

# TODO 4: Branch result
# if unlock_score >= 30:
#     print("Gate unlocked. Move now.")
# else:
#     print("Access denied. Recalculate clues.")

print("TODO: complete Lesson 2 starter tasks.")
`
  },
  {
    id: "lesson-03",
    title: "3 · Choices & Consequences",
    goal: "Sort a traveller into the right faction using comparison logic and nested branching.",
    story: "The faction gate opens only when the traveller’s scores are judged fairly by the placement system.",
    theory: [
      {
        heading: "if / elif / else",
        explanation: "Branch your logic so code reacts to conditions. Python checks each condition in order and runs only the first block whose condition is True.",
        code: `power = 72
if power >= 80:
    print("Elite")
elif power >= 60:
    print("Ready")
else:
    print("Train")`
      },
      {
        heading: "Nested if (a decision inside a decision)",
        explanation: "You can put another if inside an if block to check a more specific condition, but only once the outer condition is already True.",
        code: `if power >= 80:
    if logic >= 80:
        print("Command Elite")
    else:
        print("Command")`
      }
    ],
    quiz: [
      {
        question: "In an if/elif/else chain, how many of the blocks can run?",
        options: [
          "Exactly one — the first condition that is True",
          "All of the blocks always run",
          "None of the blocks run unless every condition is True",
          "Only the else block ever runs"
        ],
        correctIndex: 0
      },
      {
        question: "What does a nested if let you do?",
        options: [
          "Check a more specific condition, but only when an outer condition is already True",
          "Run two unrelated programs at the same time",
          "Replace the need for any elif statements",
          "Skip the outer if statement entirely"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 3 starter: Choices and Consequences

print("Faction Placement Simulator")

bravery = int(input("Bravery score (0-100): "))
logic = int(input("Logic score (0-100): "))

# TODO 1: Assign group using if/elif/else.
# Required outcomes:
# - Command
# - Frontline
# - Scholar
# - Support
# TODO 2: Add a nested if for "Command Elite".
group = ""

print("TODO: complete Lesson 3 starter tasks.")
`
  },
  {
    id: "lesson-04",
    title: "4 · Data Without Loops",
    goal: "Use lists, tuples, indexes, and if/else logic to manage house records.",
    story: "The academy dashboard needs a quick leader update before the annual points report is sent out.",
    theory: [
      {
        heading: "Lists + index",
        explanation: "Lists hold ordered items. Use indexes (starting at 0) to read or update positions.",
        code: `teams = ["Falcon", "Wolf", "Stag"]
teams[1] = "Raven"
print(teams[0])
print(len(teams))`
      },
      {
        heading: "Tuples (fixed groups of values)",
        explanation: "A tuple is like a list but it can't be changed after it's created — good for values that belong together and shouldn't be edited, like a year and term.",
        code: `term_info = ("Year 1", "Term 2", 2026)
print(term_info[0], term_info[2])`
      }
    ],
    quiz: [
      {
        question: "What does teams[0] refer to in a list called teams?",
        options: [
          "The first item in the list",
          "The last item in the list",
          "The total number of items in the list",
          "A new empty list"
        ],
        correctIndex: 0
      },
      {
        question: "What is the key difference between a list and a tuple?",
        options: [
          "A tuple can't be changed after it's created; a list can",
          "A tuple can only hold numbers",
          "A list can only hold one value",
          "There is no difference"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 4 starter: Data Without Loops

print("House Points Tracker Lite")

team_names = ["Falcon", "Wolf", "Stag", "Raven"]
team_points = [42, 38, 46, 40]
term_info = ("Year 1", "Term 2", 2026)

# TODO 1: Update one team by index
# Example idea: team_points[1] = team_points[1] + 5

# TODO 2: Choose leader without loops
# Use if/else and list indexes to decide a leader.
leader = ""

# TODO 3: Print teams, points, term info, team count, and current leader.
print("TODO: complete Lesson 4 starter tasks.")
`
  },
  {
    id: "lesson-05",
    title: "5 · Structured Logic",
    goal: "Combine input, arithmetic, list data, and branching to build a full portal checkpoint.",
    story: "The portal team is under pressure, and the student has to decide whether the system is denied, conditional, or approved.",
    theory: [
      {
        heading: "Reading a traceback",
        explanation: "When Python hits an error it stops and prints a traceback: the file/line where it happened, the line of code itself, and an error type + message at the bottom. Always read the last line first — it tells you what actually went wrong.",
        code: `power = "80"
stability = 65
risk = power - stability
# Traceback (most recent call last):
#   File "<exec>", line 3
# TypeError: unsupported operand type(s) for -: 'str' and 'int'
# Fix: power should be an int, e.g. power = int("80")`
      },
      {
        heading: "Trace tables (following values by hand)",
        explanation: "A trace table tracks a variable's value line by line, on paper, before you trust the code. It catches logic bugs that don't crash the program but still give the wrong answer.",
        code: `power = 40
stability = 30
# line          | power | stability | risk_score
# risk_score=0  |  40   |    30     |    0
risk_score = power + stability
# risk_score=70 |  40   |    30     |    70
if risk_score >= 60:
    status = "Approved"
# status="Approved"`
      }
    ],
    quiz: [
      {
        question: "When Python prints a traceback, where should you look first to find out what went wrong?",
        options: [
          "The last line of the traceback",
          "The first line of the traceback",
          "The line numbers only, ignoring the message",
          "The filename at the very top"
        ],
        correctIndex: 0
      },
      {
        question: "What is the main purpose of a trace table?",
        options: [
          "To track a variable's value line by line before trusting the code",
          "To automatically fix logic bugs in the code",
          "To replace print() statements permanently",
          "To measure how fast the program runs"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 5 starter: Structured Logic Challenge

print("Portal Clearance System")

power = int(input("Power level (0-100): "))
stability = int(input("Stability level (0-100): "))
id_clearance = int(input("ID clearance (0-10): "))

# TODO 1: Keep these labels and use them in your branch logic.
status_labels = ["Denied", "Conditional", "Approved"]

# TODO 2: Compute risk score using the required formula.
risk_score = 0

# TODO 3: Use if/elif/else for Denied, Conditional, Approved.
status = ""

# TODO 4: Print risk score and final portal status.
print("TODO: complete Lesson 5 starter tasks.")
`
  },
  {
    id: "lesson-06",
    title: "6 · Capstone Simulation",
    goal: "Design a complete mini-simulator that connects the first half of the course.",
    story: "The first mission arc closes with a custom simulator chosen by the student team.",
    theory: [
      {
        heading: "Planning before coding",
        explanation: "Before writing code, sketch the steps in plain English (pseudocode): what inputs you need, what to calculate, and what outcomes to print. This catches design problems before they become bugs.",
        code: `# Pseudocode:
# 1. Ask for two values
# 2. Combine them into a score
# 3. Decide an outcome from the score
value_a = int(input("Value A: "))
value_b = int(input("Value B: "))
combined = value_a + value_b`
      },
      {
        heading: "Testing your own code",
        explanation: "Run your program with a few different inputs, including edge cases (very low, very high, zero), to check it behaves sensibly every time — not just for the input you happened to try first.",
        code: `# Try running your program with each of these before you're done:
# value_a = 0,   value_b = 0
# value_a = 100, value_b = 100
# value_a = -5,  value_b = 10`
      }
    ],
    quiz: [
      {
        question: "What is the main benefit of writing pseudocode before you start coding?",
        options: [
          "It helps you catch design problems before they become bugs",
          "It automatically writes the Python code for you",
          "It makes the program run faster",
          "It is required by the Python interpreter"
        ],
        correctIndex: 0
      },
      {
        question: "Why should you test your program with edge cases like 0 or very large numbers?",
        options: [
          "To check the program behaves sensibly for more than just the input you happened to try first",
          "Because Python only accepts those specific numbers",
          "Because edge cases make the code run faster",
          "It isn't necessary if the code runs once without crashing"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 6 starter: Capstone Simulation Template

print("Capstone Simulation")

# TODO 1: Name your scenario
scenario_name = ""

# TODO 2: Collect inputs
value_a = int(input("Enter value A: "))
value_b = int(input("Enter value B: "))
value_c = int(input("Enter value C: "))

# TODO 3: Create one list or tuple
status_levels = []

# TODO 4: Build outcome logic
combined = 0

# Use if/elif/else with at least 3 outcomes.
outcome = ""

# TODO 5: Print scenario, combined score, and outcome.
print("TODO: complete Lesson 6 starter tasks.")
`
  },
  {
    id: "lesson-07",
    title: "7 · Loop Launch (for)",
    goal: "Practise for loops by scanning checkpoints and spotting repeating patterns.",
    story: "The maze scanner comes online and the student has to sweep each checkpoint in order.",
    theory: [
      {
        heading: "For loop",
        explanation: "A for loop repeats a block of code a known number of times. range(1, 9) counts 1 up to (but not including) 9, so it runs 8 times.",
        code: `for checkpoint in range(1, 9):
    print("Checkpoint", checkpoint)`
      },
      {
        heading: "Spotting a pattern (multiples)",
        explanation: "The modulo operator % gives the remainder of a division. checkpoint % 3 == 0 is True exactly when checkpoint is a multiple of 3 — a common way to trigger something every Nth loop.",
        code: `for checkpoint in range(1, 9):
    if checkpoint % 3 == 0:
        print("Hazard at checkpoint", checkpoint)`
      }
    ],
    quiz: [
      {
        question: "What does range(1, 9) produce when used in a for loop?",
        options: [
          "The numbers 1 up to and including 9",
          "The numbers 1 up to, but not including, 9",
          "The numbers 0 up to 9",
          "The number 9, repeated once"
        ],
        correctIndex: 1
      },
      {
        question: "Which expression is True exactly when checkpoint is a multiple of 3?",
        options: [
          "checkpoint % 3 == 0",
          "checkpoint / 3 == 0",
          "checkpoint == 3",
          "checkpoint + 3 == 0"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 7 starter: Loop Launch (for)

print("Maze Checkpoint Scanner")

# TODO 1: Create a for loop from 1 to 8 inclusive.
# PSEUDOCODE:
# - Repeat a block exactly 8 times.
# - Track which checkpoint number you are currently on.

    # TODO 2: Print checkpoint number each loop.
    # PSEUDOCODE:
    # - Output the word "Checkpoint" followed by the current checkpoint number.

    # TODO 3: If checkpoint is a multiple of 3, print hazard message.
    # PSEUDOCODE:
    # - Check whether the current checkpoint is divisible by 3.
    # - If yes, print a hazard warning message.

print("TODO: complete Lesson 7 starter tasks.")
`
  },
  {
    id: "lesson-08",
    title: "8 · Loop Control (while)",
    goal: "Use a while loop with a counter and a safe stopping condition.",
    story: "A launch countdown begins, and the student must keep the terminal running until the timer reaches zero.",
    theory: [
      {
        heading: "While loop",
        explanation: "Repeat while a condition is True. Always update the loop state, or the condition will never become False.",
        code: `countdown = 3
while countdown > 0:
    print(countdown)
    countdown -= 1
print("Launch")`
      },
      {
        heading: "Avoiding infinite loops (safety)",
        explanation: "A while loop needs its condition to eventually become False. If you forget to update the counter inside the loop, it will run forever — always double-check the update line is inside the loop body.",
        code: `countdown = 3
while countdown > 0:
    print(countdown)
    # Forgetting countdown -= 1 here causes an infinite loop!
    countdown -= 1`
      }
    ],
    quiz: [
      {
        question: "A while loop keeps repeating as long as...",
        options: [
          "its condition is True",
          "a fixed number of times has passed",
          "the user presses a key",
          "the program has an error"
        ],
        correctIndex: 0
      },
      {
        question: "What causes a while loop to run forever by accident?",
        options: [
          "Forgetting to update the variable that the condition depends on",
          "Using print() inside the loop",
          "Starting the counter at zero",
          "Using range() instead of a condition"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 8 starter: Loop Control (while)

print("Arena Countdown Terminal")

countdown = 10

# TODO 1: Write a while loop that runs while countdown is at least 1.
# PSEUDOCODE:
# - Keep repeating while countdown is still positive.
# - Stop repeating once countdown reaches zero.

    # TODO 2: Print the current countdown value.
    # PSEUDOCODE:
    # - Show "T-minus" with the current countdown number.

    # TODO 3: Update countdown so loop eventually stops.
    # PSEUDOCODE:
    # - Decrease countdown by 1 each cycle.
    # - This update must happen inside the loop.

# TODO 4: Print "Launch" after loop ends.
# PSEUDOCODE:
# - After repetition finishes, print "Launch" once.
print("TODO: complete Lesson 8 starter tasks.")
`
  },
  {
    id: "lesson-09",
    title: "9 · Loop Patterns (mixed)",
    goal: "Mix for and while loops to validate input and process a queue of trainees.",
    story: "The faction trial needs repeated score checks, and the student has to decide which loop solves each part.",
    theory: [
      {
        heading: "Validation pattern",
        explanation: "Keep asking until the input is valid. A while loop that re-prompts is the standard way to reject bad input without crashing.",
        code: `score = int(input("Score 0-100: "))
while score < 0 or score > 100:
    score = int(input("Try again: "))
print("Accepted", score)`
      },
      {
        heading: "Mixing for and while loops",
        explanation: "A for loop can repeat a fixed number of times (e.g. one pass per trainee), while a while loop nested inside it can keep validating a single trainee's input until it's acceptable, before moving on to the next trainee.",
        code: `for trainee in range(1, 6):
    score = int(input("Score: "))
    while score < 0 or score > 100:
        score = int(input("Try again: "))
    print("Trainee", trainee, "scored", score)`
      }
    ],
    quiz: [
      {
        question: "In a validation while loop, when does the loop stop asking for input again?",
        options: [
          "As soon as the input meets the required condition",
          "After exactly one attempt, no matter what",
          "Only when the program is restarted",
          "Never — it always asks forever"
        ],
        correctIndex: 0
      },
      {
        question: "In a for loop that contains a nested while loop for validation, what does the while loop do?",
        options: [
          "Keeps re-asking for one trainee's input until it's valid, before the for loop moves on",
          "Repeats the entire for loop from the start",
          "Stops the for loop permanently",
          "Runs completely independently of the for loop"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 9 starter: Loop Patterns (mixed)

print("Faction Trial Queue")

eligible_count = 0

# TODO 1: Create a for loop for trainees 1 to 5.
# PSEUDOCODE:
# - Repeat the trainee process exactly 5 times.
# - Treat each repeat as one trainee attempt.

    # TODO 2: Read one score input.
    # PSEUDOCODE:
    # - Ask for a numeric score.
    # - Convert the response to a number type.

    # TODO 3: Validate score with while loop until 0-100.
    # PSEUDOCODE:
    # - If score is below 0 or above 100, keep asking again.
    # - Keep repeating until score is within the valid range.

    # TODO 4: If score >= 70, increment eligible_count.
    # PSEUDOCODE:
    # - Check if score meets eligibility threshold (70 or higher).
    # - If eligible, increase the counter by one.

# TODO 5: Print final eligible trainee count.
# PSEUDOCODE:
# - After all trainees are processed, print the total eligible count.
print("TODO: complete Lesson 9 starter tasks.")
`
  },
  {
    id: "lesson-10",
    title: "10 · Loop Capstone",
    goal: "Finish the course with a loop-based capstone and responsible Gemini prompting.",
    story: "The final portal rotation mission brings the whole story together and asks the student to document the result safely.",
    theory: [
      {
        heading: "Bringing loops together",
        explanation: "Combining a for loop (a fixed number of cycles) with a nested while loop (validating one cycle's input) lets you process a whole queue safely, one validated item at a time.",
        code: `for cycle in range(1, 7):
    command = input("Command: ").strip().lower()
    while command not in ("open", "hold"):
        command = input("Enter open or hold: ").strip().lower()
    print("Cycle", cycle, "->", command)`
      },
      {
        heading: "Prompting AI safely",
        explanation: "When asking an AI assistant (like Gemini) for help, be specific about what you want, review the code before using it, and never paste in personal information, passwords, or anything private.",
        code: `# Example of a clear, safe prompt:
# "Explain what a while loop does in Python,
#  using a simple counting example.
#  Don't include any personal data."`
      }
    ],
    quiz: [
      {
        question: "Combining a for loop with a nested while loop for validation is useful because...",
        options: [
          "each cycle can be validated individually before moving to the next",
          "it removes the need for if statements",
          "it makes for loops run faster",
          "for loops cannot contain any other loops"
        ],
        correctIndex: 0
      },
      {
        question: "Which is a responsible way to prompt an AI assistant for coding help?",
        options: [
          "Be specific about what you want, and don't share personal information",
          "Paste in your passwords so it can test the login",
          "Ask a vague question and copy whatever comes back without reading it",
          "Share a classmate's private information for context"
        ],
        correctIndex: 0
      }
    ],
    starterCode: `# Lesson 10 starter: Loop Capstone + AI Safety

print("Portal Rotation Control")

open_count = 0
hold_count = 0

# TODO 1: Create for loop for cycles 1 to 6.
# PSEUDOCODE:
# - Repeat a command cycle exactly 6 times.
# - Keep track of which cycle you are currently in.

    # TODO 2: Ask for command and normalize it.
    # PSEUDOCODE:
    # - Ask user for a command.
    # - Clean input so case/spacing do not break checks.

    # TODO 3: Validate command with while loop until open/hold.
    # PSEUDOCODE:
    # - If command is not one of the two allowed options, ask again.
    # - Keep repeating until command is valid.

    # TODO 4: Update open_count or hold_count using if/else.
    # PSEUDOCODE:
    # - If command means open, add to open counter.
    # - Otherwise add to hold counter.

# TODO 5: Print final command totals.
# PSEUDOCODE:
# - After all cycles, print both totals in a readable summary.
print("TODO: complete Lesson 10 starter tasks.")
`
  }
];
