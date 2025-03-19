document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const todoList = document.getElementById("tasks");

  // Load tasks from localStorage on page load
  loadTasks();

  // Handle form submission
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
          addTask(taskText, false);
          saveTasks();
          taskInput.value = "";
      }
  });

  // Function to create and add a task
  function addTask(text, completed) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");

      span.textContent = text;
      button.textContent = "x"; // Smaller and simpler remove sign
      button.classList.add("remove-btn");
      button.style.background = "#ff4d4d";
      button.style.border = "none";
      button.style.color = "white";
      button.style.padding = "2px 6px";
      button.style.marginLeft = "10px";
      button.style.borderRadius = "4px";
      button.style.cursor = "pointer";
      button.style.fontSize = "12px";

      li.appendChild(span);
      li.appendChild(button);

      if (completed) li.classList.add("completed");

      li.addEventListener("click", toggleTaskCompletion);
      button.addEventListener("click", removeTask);

      todoList.appendChild(li);
  }

  function toggleTaskCompletion(e) {
      const li = e.currentTarget;
      li.classList.toggle("completed");
      saveTasks();
  }

  function removeTask(e) {
      e.stopPropagation();
      e.currentTarget.parentElement.remove();
      saveTasks();
  }

  // Save and load tasks from localStorage
  function saveTasks() {
      const tasks = [...todoList.children].map(li => {
          const span = li.querySelector("span");
          return {
              text: span.textContent,
              completed: li.classList.contains("completed")
          };
      });
      localStorage.setItem("todoItems", JSON.stringify(tasks));
  }

  function loadTasks() {
      (JSON.parse(localStorage.getItem("todoItems")) || []).forEach(({ text, completed }) => addTask(text, completed));
  }
});

// Higher-order function that receives and executes a function
const executeCallback = (callback) => callback && callback();

// Function that returns a named function
const provideNamedFunction = () => function namedAction() {
  console.log("Executing a named function");
};

// Function that returns an anonymous function
const provideAnonymousFunction = () => () => console.log("Executing an anonymous function");

// Export functions for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { executeCallback, provideNamedFunction, provideAnonymousFunction };
}
