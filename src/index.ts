(() => {
  enum NotificatinPlatform {
    SMS = 'SMS',
    EMAIL = 'EMAIL',
    PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
}
    const UUID = (): string => {
        return Math.random().toString(32).substr(2, 9);
    };

    const DateUtils = {
        tomorrow(): Date {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today(): Date{
            return new Date();
        }, 

        formatDate(date: Date): string {
            return `${date.getDate()}.${date.getMonth() + 1}. ${date.getFullYear()}`
        }
    };

    interface Task {
    id: string;
    dateCreate: Date;
    dateUpdated: Date;
    description: string;
    render(): string;
  }

  class Remider implements Task {
    id: string = UUID();
    dateCreate: Date = DateUtils.today();
    dateUpdated: Date = DateUtils.today();
    description: string = " ";

    date: Date = DateUtils.tomorrow();
    notifications: Array<NotificatinPlatform> = [NotificatinPlatform.EMAIL];

    constructor(description: string, date: Date, notifications: Array<NotificatinPlatform>) {
      this.description = description;
      this.date = date;
      this.notifications = notifications;
    }
    render(): string {
      return ` 
      -> Reminder <-
      description: ${this.description}
      date: ${DateUtils.formatDate(this.date) }
      platform: ${this.notifications.join(',')}
      `;
    }
  }

  class Todo implements Task {
    id: string = UUID();
    dateCreate: Date = DateUtils.today();
    dateUpdated: Date = DateUtils.today();
    description: string = " ";

    done: boolean = false;

    constructor(description: string) {
      this.description = description;
    }

    render(): string {
      return `
      -> ToDo <-
      description: ${this.description}
      done: ${this.done}
      `;
    }
  }

  const todo = new Todo("ToDo Criado com a classe");

  const reminder = new Remider("Remider criado com a classe", new Date(), [NotificatinPlatform.EMAIL],
  );

  const taskView = {
    render(tasks: Array<Task>) {
      const tasksList = document.getElementById("tasksList");
      while (tasksList?.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
      }

      tasks.forEach((task) => {
        const li = document.createElement("LI");
        const textNode = document.createTextNode(task.render());
        li.appendChild(textNode);
        tasksList?.appendChild(li);
      });
    },
  };

  const TaskController = (view: typeof taskView) => {
    const tasks: Array<Task> = [todo, reminder];

    const handleEvent = (event: Event) => {
      event.preventDefault();
      view.render(tasks);
    };

    document
      .getElementById("taskForm")
      ?.addEventListener("submit", handleEvent);
  };

  TaskController(taskView);
})();
