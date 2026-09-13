interface Task {
  id: number;
  title: string;
  status: "todo" | "doing" | "done";
  priority: number;
  ownerId: number;
}

class Store {
  static tasks: Task[] = [];
  static id: number = 0;

  add(title: string, priority: number, ownerId: number) {
    if (!title || title.trim() === "") {
      throw new Error("Title is required");
    }
    if (priority < 1 || priority > 3) {
      throw new Error("Priority must be between 1 and 3");
    }
    Store.id = Store.id + 1;

    const task: Task = {
      id: Store.id,
      title: title,
      status: "todo",
      priority: priority,
      ownerId: ownerId,
    };

    Store.tasks.push(task);

    return task;
  }

  findById(id: number) {
    const task = Store.tasks.find((value) => value.id == id);
    if (!task) {
      return undefined;
    }
    return task;
  }

  update(id: number, changes: Partial<Task>) {
    var task = this.findById(id);
    if (!task) {
      return undefined;
    }
    const updatedTask: Task = {
      id: id,
      title: changes.title || task.title,
      status: "todo",
      priority: changes.priority || task.priority,
      ownerId: changes.ownerId || task.ownerId,
    };

    task = updatedTask;

    return updatedTask;
  }

  remove(id: number) {
    const task = Store.tasks.find((value) => value.id == id);
    Store.tasks = Store.tasks.filter((task) => task.id != id);
  }
  
}
const store = new Store();

console.log(store.add("Practice Node.js", 3, 2));
console.log(store.add("Practice Node.js", 3, 2));
console.log(store.findById(2));
console.log(
  store.update(2, {
    title: "Practice js",
    status: "todo",
    priority: 2,
  }),
);
