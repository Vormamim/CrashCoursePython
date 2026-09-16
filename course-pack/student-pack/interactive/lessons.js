// lessons.js – course lesson definitions for the interactive IDE
// Each entry has: id, title, and starterCode (the Python starter file contents).
// Add new lessons by appending to the LESSONS array.

const LESSONS = [
  {
    id: "lesson-01",
    title: "1 · Mission Control",
    goal: "Create a simple tribute profile and practise variables, types, reassignment, and printed output.",
    story: "The mission console wakes up and asks the student to introduce a crew member before the arena simulation starts.",
    taskIntro: {
      whatToDo: "Fill in four starter variables for your crew member — their name, district number, score, and active status. Then update the score to reflect a positive event happening (something like score = score + 1.5), and finish by printing all four values so the console shows a complete status report.",
      coreIdea: "The core idea: a variable is a named box that stores a value you can change later by reassigning it — that's what lets you update score partway through the program and have the new value stick when you print it."
    },
    theory: [
      {
        heading: "Variables & types",
        appliesTo: "TODO 1-3",
        explanation: "On the mission console, a variable is a named box that stores a value — like a crew member's profile slot. Python figures out the type (text, whole number, decimal, true/false) from what you put in it, and you can update it later by reassigning it as the mission progresses.",
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
    taskIntro: {
      whatToDo: "You'll collect two number clues from the player using input(), then convert both from text into integers with int() so you can do maths with them. Combine the two converted numbers with arithmetic to compute an unlock_score, then use if/else so a score of 30 or higher unlocks the gate while anything lower leaves it denied.",
      coreIdea: "The core idea: input() always gives you back text, even when someone types a number, so you must convert it with int() before you can add, multiply, or compare it — skip that step and the unlock maths will break."
    },
    theory: [
      {
        heading: "Input + conversion",
        appliesTo: "TODO 1-2",
        explanation: "The terminal's input() always hands back text (a string), even when a clue is a number. Convert it with int() or float() before you do any math with it, or the unlock calculation won't run.",
        code: `age_text = input("Age: ")
age = int(age_text)
print(age + 1)`
      },
      {
        heading: "Doing math with converted input",
        appliesTo: "TODO 3",
        explanation: "Once both clues are converted to numbers, combine them with ordinary arithmetic to work out a result — the kind of combined reading a sealed terminal checks before it grants access.",
        code: `signal_x = int(input("Signal X: "))
signal_y = int(input("Signal Y: "))
combined_signal = (signal_x * 3) + signal_y
print(combined_signal)`
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
    taskIntro: {
      whatToDo: "Using the bravery and logic scores the player enters, write an if/elif/else chain that sorts the traveller into one of four groups: Command, Frontline, Scholar, or Support. Then add a nested if inside the Command branch that checks for an extra-high score and upgrades that traveller to 'Command Elite'.",
      coreIdea: "The core idea: if/elif/else checks conditions in order and runs exactly one matching branch, and nesting an if inside another lets you ask a more specific follow-up question — like 'are they Elite?' — only once the outer condition is already true."
    },
    theory: [
      {
        heading: "if / elif / else",
        appliesTo: "TODO 1",
        explanation: "The placement system branches its logic so it reacts fairly to each traveller's scores. Python checks each condition in order and runs only the first block whose condition is True — everyone gets sorted by the same rule.",
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
        appliesTo: "TODO 2",
        explanation: "You can put another if inside an if block to check a more specific condition — like whether a traveller who already cleared the outer gate also qualifies for an inner one — but only once the outer condition is already True.",
        code: `if speed >= 80:
    if fuel >= 80:
        print("Afterburner ready")
    else:
        print("Standard boost")`
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
    taskIntro: {
      whatToDo: "Update one team's points directly by its index in the team_points list (for example, giving Wolf a bonus). Then, without using any loops, use if/else comparisons on the list values by index to work out which team currently has the most points and store its name as leader. Finish by printing the team names, points, term info, how many teams there are, and the current leader.",
      coreIdea: "The core idea: a list stores items in order so you can read or change any one of them with an index starting at 0, while a tuple is a similar group that's locked once created — good for fixed facts, like the term and year, that shouldn't accidentally change."
    },
    theory: [
      {
        heading: "Lists + index",
        appliesTo: "TODO 1-2",
        explanation: "The academy's team records live in a list — an ordered set of items. Use indexes (starting at 0) to read or update a team's entry before the dashboard refreshes.",
        code: `teams = ["Falcon", "Wolf", "Stag"]
teams[1] = "Raven"
print(teams[0])
print(len(teams))`
      },
      {
        heading: "Tuples (fixed groups of values)",
        appliesTo: "TODO 3",
        explanation: "A tuple is like a list but can't be changed once it's created — good for values that belong together and shouldn't drift, like a term and year stamped on the report.",
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
    taskIntro: {
      whatToDo: "Using the power, stability, and ID clearance values the player enters, compute a risk_score and then use if/elif/else with the status_labels list to sort the result into Denied, Conditional, or Approved — factoring the ID clearance into that decision too. Finish by printing the risk score and the final status.",
      coreIdea: "The core idea: before you trust a chain of calculations and branches, trace it by hand on paper line by line, writing down each variable's value as it changes, so you catch a wrong risk score or a wrongly-cleared traveller before the code ever runs for real."
    },
    theory: [
      {
        heading: "Reading a traceback",
        appliesTo: "Debugging skill",
        explanation: "When the portal checkpoint code hits an error, Python stops and prints a traceback: the file/line where it happened, the line of code itself, and an error type + message at the bottom. Always read the last line first — it tells you what actually went wrong.",
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
        appliesTo: "TODO 2",
        explanation: "A trace table tracks a variable's value line by line, on paper, before you trust the checkpoint's logic. It catches bugs that don't crash the program but still clear a traveller who shouldn't be cleared.",
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
    taskIntro: {
      whatToDo: "Design your own mini-simulator: give it a scenario_name, collect three input values from the player, and store at least three possible outcome names in a status_levels list or tuple. Combine the three inputs into a single combined score, then use if/elif/else with at least three outcomes to decide the result, and print the scenario name, combined score, and final outcome.",
      coreIdea: "The core idea: sketching your plan as pseudocode first, and then testing your finished simulator with edge-case inputs like zero or very large numbers, catches design problems before they become bugs — this lesson is about planning and testing your own logic, not just following someone else's."
    },
    theory: [
      {
        heading: "Planning before coding",
        appliesTo: "Before TODO 1",
        explanation: "Before writing your own simulator, sketch the steps in plain English (pseudocode): what inputs you need, what to calculate, and what outcomes to print. This catches design problems before they become bugs in your own mission.",
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
        appliesTo: "Before TODO 5",
        explanation: "Run your simulator with a few different inputs, including edge cases (very low, very high, zero), to check it behaves sensibly for a real mission — not just for the one input you happened to try first.",
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
    taskIntro: {
      whatToDo: "Build a for loop using range() that sweeps checkpoints 1 through 8 in order. Inside the loop, print the current checkpoint number each pass, and add an if check using the modulo operator (%) to spot every checkpoint that's a multiple of 3, printing a hazard warning for each one.",
      coreIdea: "The core idea: a for loop with range() repeats an action a known number of times, which is how you scan all 8 checkpoints without writing the same print line 8 times over — and % (modulo) spots multiples by checking whether a division leaves no remainder."
    },
    theory: [
      {
        heading: "For loop",
        appliesTo: "TODO 1-2",
        explanation: "The maze scanner's for loop repeats a block of code a known number of times. range(1, 4) counts 1 up to (but not including) 4, so it runs 3 scan passes.",
        code: `for scan in range(1, 4):
    print("Scan pass", scan)`
      },
      {
        heading: "Spotting a pattern (multiples)",
        appliesTo: "TODO 3",
        explanation: "The modulo operator % gives the remainder of a division. scan % 2 == 0 is True exactly when scan is a multiple of 2 — how the scanner flags something every Nth pass.",
        code: `for scan in range(1, 4):
    if scan % 2 == 0:
        print("Anomaly at scan", scan)`
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
    taskIntro: {
      whatToDo: "Write a while loop that keeps running as long as countdown is 1 or more. Each pass, print the current countdown value (something like 'T-minus' plus the number), then decrease countdown by 1 inside the loop so it eventually reaches zero and stops. Once the loop finishes, print 'Launch' one final time.",
      coreIdea: "The core idea: a while loop keeps repeating for as long as its condition stays True, so you must update the variable it depends on inside the loop body — forget that update and the countdown, and the loop, never stop."
    },
    theory: [
      {
        heading: "While loop",
        appliesTo: "TODO 1-3",
        explanation: "The countdown terminal repeats while a condition is True. Always update the loop state, or the countdown will never reach zero.",
        code: `fuel_ticks = 3
while fuel_ticks > 0:
    print(fuel_ticks)
    fuel_ticks -= 1
print("Ignition")`
      },
      {
        heading: "Avoiding infinite loops (safety)",
        appliesTo: "TODO 3",
        explanation: "A while loop needs its condition to eventually become False. If the terminal forgets to update the counter inside the loop, the countdown runs forever — always double-check the update line is inside the loop body.",
        code: `fuel_ticks = 3
while fuel_ticks > 0:
    print(fuel_ticks)
    # Forgetting fuel_ticks -= 1 here causes an infinite loop!
    fuel_ticks -= 1`
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
    taskIntro: {
      whatToDo: "Use a for loop to process five trainees one at a time. For each trainee, read a score with input() and convert it to a number, then use a nested while loop to keep re-asking until the score is between 0 and 100. If a trainee's valid score is 70 or higher, add one to eligible_count, and once all five trainees are done, print the final eligible count.",
      coreIdea: "The core idea: you can nest a while loop inside a for loop so the while loop fully handles validating one trainee's input — rejecting bad values until it's acceptable — before the for loop moves on to the next trainee."
    },
    theory: [
      {
        heading: "Validation pattern",
        appliesTo: "TODO 3",
        explanation: "The faction trial keeps asking until a score is valid. A while loop that re-prompts is the standard way to reject a bad reading without crashing the whole trial.",
        code: `energy = int(input("Energy 0-50: "))
while energy < 0 or energy > 50:
    energy = int(input("Try again: "))
print("Accepted", energy)`
      },
      {
        heading: "Mixing for and while loops",
        appliesTo: "TODO 1-3",
        explanation: "A for loop can repeat a fixed number of times (one pass per candidate), while a while loop nested inside it keeps validating a single candidate's reading until it's acceptable, before the trial moves on to the next one.",
        code: `for cadet in range(1, 4):
    energy = int(input("Energy: "))
    while energy < 0 or energy > 50:
        energy = int(input("Try again: "))
    print("Cadet", cadet, "at", energy)`
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
    taskIntro: {
      whatToDo: "Use a for loop to run six command cycles. Each cycle, ask the player for a command and normalize it (clean up spacing and capitalization) so your checks aren't thrown off by formatting, then use a nested while loop to keep re-asking until the command is either 'open' or 'hold'. Use if/else to add each valid command to the right counter, and after all six cycles, print both totals in a clear summary.",
      coreIdea: "The core idea: combining a for loop for a fixed number of cycles with a nested while loop for validation lets you safely process a whole queue of commands, one fully-checked command at a time — the same careful, double-checking habit matters when you ask an AI assistant like Gemini for help too."
    },
    theory: [
      {
        heading: "Bringing loops together",
        appliesTo: "TODO 1-3",
        explanation: "Combining a for loop (a fixed number of rotation cycles) with a nested while loop (validating one cycle's command) lets the final mission process a whole queue safely, one validated command at a time.",
        code: `for round_num in range(1, 4):
    action = input("Action: ").strip().lower()
    while action not in ("scan", "wait"):
        action = input("Enter scan or wait: ").strip().lower()
    print("Round", round_num, "->", action)`
      },
      {
        heading: "Prompting AI safely",
        appliesTo: "AI-safety guidance",
        explanation: "As the mission wraps up, be just as careful asking an AI assistant (like Gemini) for help: be specific about what you want, review the code before using it, and never paste in personal information, passwords, or anything private.",
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
