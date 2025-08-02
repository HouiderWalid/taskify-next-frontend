export default {
  globals: {
    task: {
      statuses: {
        todo: 'Todo',
        in_progress: 'In Progress',
        done: 'Done'
      },
      priorities: {
        low: 'Low',
        medium: 'Medium',
        high: 'High'
      }
    }
  },
  components:{
    autocomplete:{
      noResultsFound: 'No results found.',
    }
  },
  confirmationModal:{
    buttons:{
      yes: 'Yes',
      no: 'No'
    }
  },
  navbar: {
    overview: 'Overview',
    projects: 'Projects',
    tasks: 'Tasks',
    users: 'Users',
    settings: 'Settings',
  },
  overview: {
    smallCards: {
      projects: {
        title: 'Projects',
        time: 'All Time'
      },
      tasks: {
        title: 'Tasks',
        time: 'Last 7 Days'
      },
      doneTasks: {
        title: 'Done Tasks',
        time: 'Last 7 Days'
      }
    },
    charts: {
      tasksCount: {
        title: 'Tasks Count'
      },
      tasksDoneCount: {
        title: 'Tasks Done Count'
      }
    }
  },
  signup: {
    form: {
      fields: {
        full_name: {
          title: 'Full Name'
        },
        email: {
          title: 'Email'
        },
        password: {
          title: 'Password'
        },
        password_confirmation: {
          title: 'Password Confirmation'
        }
      }
    }
  },
  signin: {
    title: 'Welcome Back',
    subTitle: 'Sign in to your account',
    form: {
      fields: {
        email: {
          title: 'Email'
        },
        password: {
          title: 'Password'
        }
      }
    }
  },
  project: {
    title: 'Projects',
    buttons: {
      newProjects: 'Create Project'
    },
    item: {
      buttons: {
        edit: 'Edit',
        delete: 'Delete'
      },
      progress: 'Progress',
      team: 'Team:',
      due_date: 'Due Date'
    },
    dialogs: {
      form: {
        title:{
          create: 'Create Project',
          edit: 'Edit Project',
        },
        fields: {
          title: {
            title: 'Title',
            placeholder: 'Enter the project title',
          },
          due_date: {
            title: 'Due Date'
          },
          description: {
            title: 'Description',
            placeholder: 'Describe your project',
          }
        },
        buttons: {
          create: 'Create',
          save: 'Save',
          cancel: 'Cancel',
        }
      },
      delete: {
        title: 'Delete Project',
        description: 'Are you sure you want to delete this project ?',
      }
    }
  },
  task: {
    title: 'Tasks',
    buttons: {
      title: 'Create Task',
    },
    item:{
      buttons: {
        edit: 'Edit',
        delete: 'Delete'
      },
      project: 'Project',
      due_date: 'Due Date'
    },
    dialogs: {
      form: {
        title:{
          create: 'Create Task',
          edit: 'Edit Task',
        },
        fields: {
          project: {
            title: 'Project',
            placeholder: 'Search in projects'
          },
          member: {
            title: 'Assigned to member',
            placeholder: 'Search in members'
          },
          due_date: {
            title: 'Due Date',
          },
          title: {
            title: 'Title',
            placeholder: 'Enter the title'
          },
          priority: {
            title: 'Priority',
          },
          description: {
            title: 'Description',
            placeholder: 'Describe the task'
          }
        },
        buttons: {
          create: 'Create',
          save: 'Save',
          cancel: 'Cancel',
        }
      },
      delete: {
        title: 'Delete Task',
        description: 'Are you sure you want to delete this task ?',
      }
    }
  }
}