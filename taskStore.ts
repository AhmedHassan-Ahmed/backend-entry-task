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
    const task = this.findById(id);

    if (!task) {
      return undefined;
    }

    if (changes.title !== undefined) {
      task.title = changes.title;
    }

    if (changes.status !== undefined) {
      task.status = changes.status;
    }

    if (changes.priority !== undefined) {
      task.priority = changes.priority;
    }

    if (changes.ownerId !== undefined) {
      task.ownerId = changes.ownerId;
    }

    return task;
  }

  remove(id: number) {
    const task = this.findById(id);

    if (!task) {
      return false;
    }

    Store.tasks = Store.tasks.filter((task) => task.id !== id);

    return true;
  }

  list(filter: Partial<Task> = {}) {
    let result = [...Store.tasks];
    if (filter.status) {
      result = result.filter((task) => task.status === filter.status);
    }
    if (filter.ownerId !== undefined) {
      result = result.filter((task) => task.ownerId === filter.ownerId);
    }
    result.sort((a, b) => b.priority - a.priority);
    return result;
  }

  countByStatus() {
    return {
      todo: Store.tasks.filter((task) => task.status === "todo").length,
      doing: Store.tasks.filter((task) => task.status === "doing").length,
      done: Store.tasks.filter((task) => task.status === "done").length,
    };
  }

  async importFromApi(userId: number) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
      );
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data: {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
      }[] = await response.json();

      data.forEach((item) => {
        const task = this.add(item.title, 1, item.userId);
        if (item.completed) {
          task.status = "done";
        }
      });
    } catch (error) {
      console.error("Import failed:", error);
    }
  }
}

const store = new Store();

console.log(store.add("Write the report1", 3, 2));
console.log(store.add("Write the report2", 2, 1));
console.log(store.add("Write the report3", 3, 2));
console.log(store.add("Write the report4", 1, 3));
console.log(store.add("Test API", 2, 3));

console.log(" Update ");
console.log(
  store.update(2, {
    title: "Write the report edited",
    status: "doing",
  }),
);

console.log(" Remove ");
console.log(store.remove(4));

console.log(" Find ");
console.log(store.findById(2));

console.log(" Filtered List ");
console.log(
  store.list({
    ownerId: 2,
  }),
);

console.log(" Count By Status ");
console.log(store.countByStatus());

console.log(" API ");

async function main() {
  await store.importFromApi(3);

  console.log(" After Import ");
  console.log(store.list({ ownerId: 3 }));

  console.log(" Counts ");
  console.log(store.countByStatus());
}

main();
