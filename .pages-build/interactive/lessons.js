// lessons.js – course lesson definitions for the interactive IDE
// Each entry has: id, title, and starterCode (the Python starter file contents).
// Add new lessons by appending to the LESSONS array.

const LESSONS = [
  {
    id: "lesson-01",
    title: "1 · Mission Control",
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
