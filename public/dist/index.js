"use strict";
(function () {
    var NotificatinPlatform;
    (function (NotificatinPlatform) {
        NotificatinPlatform["SMS"] = "SMS";
        NotificatinPlatform["EMAIL"] = "EMAIL";
        NotificatinPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificatinPlatform || (NotificatinPlatform = {}));
    var UUID = function () {
        return Math.random().toString(32).substr(2, 9);
    };
    var DateUtils = {
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today: function () {
            return new Date();
        },
        formatDate: function (date) {
            return "".concat(date.getDate(), ".").concat(date.getMonth() + 1, ". ").concat(date.getFullYear());
        }
    };
    var Remider = /** @class */ (function () {
        function Remider(description, date, notifications) {
            this.id = UUID();
            this.dateCreate = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = " ";
            this.date = DateUtils.tomorrow();
            this.notifications = [NotificatinPlatform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Remider.prototype.render = function () {
            return " \n      -> Reminder <-\n      description: ".concat(this.description, "\n      date: ").concat(DateUtils.formatDate(this.date), "\n      platform: ").concat(this.notifications.join(','), "\n      ");
        };
        return Remider;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dateCreate = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = " ";
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return "\n      -> ToDo <-\n      description: ".concat(this.description, "\n      done: ").concat(this.done, "\n      ");
        };
        return Todo;
    }());
    var todo = new Todo("ToDo Criado com a classe");
    var reminder = new Remider("Remider criado com a classe", new Date(), [NotificatinPlatform.EMAIL]);
    var taskView = {
        render: function (tasks) {
            var tasksList = document.getElementById("tasksList");
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement("LI");
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        },
    };
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document
            .getElementById("taskForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleEvent);
    };
    TaskController(taskView);
})();
