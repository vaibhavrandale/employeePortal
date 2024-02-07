const attendanceData = [
  {
    id: 'new_id_1',
    employee_id: 19072023009,
    user_id: 'new_user_id_1',
    user_email: 'vaibhav.randale@taypro.in',
    username: 'Vaibhav Randale',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 1,
    loginTime: new Date('2023-12-01 09:00:52'), // Updated login time to 9 am
    logoutTime: new Date('2023-12-01  18:00:52'),
    totalHours: 8,
    isLeave: false,
    LeaveType: '',
  },

  {
    id: 'new_id_2',
    employee_id: 19072023009,
    user_id: 'new_user_id_1',
    user_email: 'vaibhav.randale@taypro.in',
    username: 'Sejal Ghojage',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 2,
    loginTime: new Date('2023-12-02 09:00:52'), // Updated login time to 9 am
    logoutTime: new Date('2023-12-02  18:02:52'),
    totalHours: 8,
    isLeave: false,
    LeaveType: '',
  },

  {
    id: 'new_id_3',
    employee_id: 19072023009,
    user_id: 'new_user_id_1',
    user_email: 'vaibhav.randale@taypro.in',
    username: 'Sejal Ghojage',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 3,
    loginTime: new Date('2023-12-03 09:00:52'), // Updated login time to 9 am
    logoutTime: new Date('2023-12-03  18:03:52'),
    totalHours: 8,
    isLeave: false,
    LeaveType: '',
  },

  {
    id: 'new_id_4',
    employee_id: 19072023010,
    user_id: 'new_user_id_2',
    user_email: 'sejal.g@taypro.in',
    username: 'Sejal Ghojage',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 1,
    loginTime: new Date('2023-12-01 09:00:52'), // Updated login time to 9 am
    logoutTime: new Date('2023-12-01  18:00:52'),
    totalHours: 8,
    isLeave: false,
    LeaveType: '',
  },

  {
    id: 'new_id_5',
    employee_id: 19072023010,
    user_id: 'new_user_id_2',
    user_email: 'sejal.g@taypro.in',
    username: 'Sejal Ghojage',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 2,
    loginTime: new Date('2023-12-02 09:00:52'), // Updated login time to 9 am
    logoutTime: new Date('2023-12-02  18:02:52'),
    totalHours: 8,
    isLeave: false,
    LeaveType: '',
  },

  {
    id: 'new_id_6',
    employee_id: 19072023010,
    user_id: 'new_user_id_2',
    user_email: 'sejal.g@taypro.in',
    username: 'Sejal Ghojage',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 3,
    loginTime: new Date('2023-12-03 09:00:52'), // Updated login time to 9 am
    logoutTime: new Date('2023-12-03  18:03:52'),
    totalHours: 8,
    isLeave: false,
    LeaveType: '',
  },

  {
    id: 'new_id_7',
    employee_id: 19072023010,
    user_id: 'new_user_id_2',
    user_email: 'sejal.g@taypro.in',
    username: 'Sejal Ghojage',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 4,
    loginTime: '', // Updated login time to 9 am
    logoutTime: '',
    totalHours: 0,
    isLeave: true,
    LeaveType: 'Sick',
  },

  {
    id: 'new_id_8',
    employee_id: 19072023009,
    user_id: 'new_user_id_2',
    user_email: 'vaibhav.randale@taypro.in',
    username: 'Sejal Ghojage',
    image:
      'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

    year: 2023,
    month: 12,
    day: 4,
    loginTime: '', // Updated login time to 9 am
    logoutTime: '',
    totalHours: 0,
    isLeave: true,
    LeaveType: 'Casual',
  },

  // {
  //   id: 'new_id_2',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 2,
  //   loginTime: new Date('2023-12-02 09:00:52'),
  //   logoutTime: new Date('2023-12-02  18:04:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_3',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 3,
  //   loginTime: new Date('2023-12-03 09:00:52'),
  //   logoutTime: new Date('2023-12-03  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_4',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 4,
  //   loginTime: '',
  //   logoutTime: '',
  //   totalHours: 8,
  //   isLeave: true,
  //   LeaveType: 'Sick',
  // },
  // {
  //   id: 'new_id_5',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 5,
  //   loginTime: new Date('2023-12-05 09:00:52'),
  //   logoutTime: new Date('2023-12-05  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_6',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 6,
  //   loginTime: new Date('2023-12-06 09:00:52'),
  //   logoutTime: new Date('2023-12-06  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_7',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 7,
  //   loginTime: new Date('2023-12-07 09:00:52'),
  //   logoutTime: new Date('2023-12-07  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_8',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 8,
  //   loginTime: new Date('2023-12-08 09:00:52'),
  //   logoutTime: new Date('2023-12-08  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_9',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 9,
  //   loginTime: new Date('2023-12-09 09:00:52'),
  //   logoutTime: new Date('2023-12-09  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_10',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 10,
  //   loginTime: new Date('2023-12-10 09:00:52'),
  //   logoutTime: new Date('2023-12-10  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_11',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 11,
  //   loginTime: new Date('2023-12-11 09:00:52'),
  //   logoutTime: new Date('2023-12-11  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_12',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 12,
  //   loginTime: new Date('2023-12-12 09:00:52'),
  //   logoutTime: new Date('2023-12-12  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_13',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 13,
  //   loginTime: new Date('2023-12-13 09:00:52'),
  //   logoutTime: new Date('2023-12-13  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },

  // // Update records for Sejal (user_id: 'new_user_id_2')
  // {
  //   id: 'new_id_14',
  //   employee_id: 19072023010,
  //   user_id: 'new_user_id_2',
  //   user_email: 'sejal@taypro.in',
  //   username: 'sejal',
  //   year: 2023,
  //   month: 12,
  //   day: 11,
  //   loginTime: new Date('2023-12-11 09:00:52'),
  //   logoutTime: new Date('2023-12-11  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_17',
  //   employee_id: 19072023010,
  //   user_id: 'new_user_id_2',
  //   user_email: 'sejal@taypro.in',
  //   username: 'sejal',
  //   year: 2023,
  //   month: 12,
  //   day: 12,
  //   loginTime: new Date('2023-12-12 09:00:52'),
  //   logoutTime: new Date('2023-12-12  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_18',
  //   employee_id: 19072023010,
  //   user_id: 'new_user_id_2',
  //   user_email: 'sejal@taypro.in',
  //   username: 'sejal',
  //   year: 2023,
  //   month: 12,
  //   day: 13,
  //   loginTime: new Date('2023-12-13 09:00:52'),
  //   logoutTime: new Date('2023-12-13  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },

  // {
  //   id: 'new_id_19',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 15,
  //   loginTime: new Date('2023-12-15 09:00:52'),
  //   logoutTime: new Date('2023-12-15  18:12:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },

  // {
  //   id: 'new_id_20',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 15,
  //   loginTime: new Date('2023-12-15 09:00:52'),
  //   logoutTime: new Date('2023-12-15  18:10:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // // // Continue updating loginTime and logoutTime for the dates from 3rd to 10th December for Vaibhav Randale
  // // // ...

  // {
  //   id: 'new_id_21',
  //   employee_id: 19072023010,
  //   user_id: 'new_user_id_2',
  //   user_email: 'sejal@taypro.in',
  //   username: 'sejal',
  //   year: 2023,
  //   month: 12,
  //   day: 7,
  //   loginTime: new Date('2023-12-07 09:00:52'),
  //   logoutTime: new Date('2023-12-07  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_22',
  //   employee_id: 19072023010,
  //   user_id: 'new_user_id_2',
  //   user_email: 'sejal@taypro.in',
  //   username: 'sejal',
  //   year: 2023,
  //   month: 12,
  //   day: 8,
  //   loginTime: new Date('2023-12-08 09:00:52'),
  //   logoutTime: new Date('2023-12-08  18:00:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },

  // {
  //   id: 'new_id_23',
  //   employee_id: 19072023010,
  //   user_id: 'new_user_id_2',
  //   user_email: 'sejal@taypro.in',
  //   username: 'sejal',
  //   year: 2023,
  //   month: 12,
  //   day: 16,
  //   loginTime: '',
  //   logoutTime: '',
  //   totalHours: 8,
  //   isLeave: true,
  //   LeaveType: 'Casual',
  // },
  // {
  //   id: 'new_id_24',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 16,
  //   loginTime: new Date('2023-12-16 09:00:52'),
  //   logoutTime: new Date('2023-12-16  18:16:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },
  // {
  //   id: 'new_id_25',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 17,
  //   loginTime: new Date('2023-12-17 09:00:52'),
  //   logoutTime: new Date('2023-12-17 18:17:52'),
  //   totalHours: 8,
  //   isLeave: false,
  //   LeaveType: '',
  // },

  // {
  //   id: 'new_id_26',
  //   employee_id: 19072023009,
  //   user_id: 'new_user_id_1',
  //   user_email: 'vaibhav.randale@taypro.in',
  //       username: 'Sejal Ghojage',   image:
  //   'https://media.istockphoto.com/id/1311315541/photo/headshot-portrait-of-smiling-businessman-posing-in-office.jpg?s=1024x1024&w=is&k=20&c=N0RAEO1r88sdf4mWt8yvmfgtuq-SYt-ImK9S4tSPKfg=',

  //   year: 2023,
  //   month: 12,
  //   day: 18,
  //   loginTime: new Date('2023-12-17 09:00:52'),
  //   logoutTime: new Date('2023-12-17 18:17:52'),
  //   totalHours: 8,
  //   isLeave: true,
  //   LeaveType: 'Provisional',
  // },

  // ... (remaining entries)
];

export default attendanceData;
