export const COURSES = [
  {
    id: 'aepm',
    name: 'AEPM',
    duration: '6 Hour Course',
    price: {
      min: 40.00,
      max: 80.00
    },
    description: 'Alcohol Education Program for Minors',
    available: true
  },
  {
    id: 'dwi-e',
    name: 'DWI-E',
    duration: '12 Hour Course',
    price: {
      min: 60.00,
      max: 140.00
    },
    description: 'DWI Education Program',
    available: true
  },
  {
    id: 'dwi-i',
    name: 'DWI-I (Repeat Offender)',
    duration: '32 Hour Course',
    price: {
      min: 160.00,
      max: 340.00
    },
    description: 'Intervention Program for Repeat Offenders',
    available: true
  },
  {
    id: 'doep',
    name: 'DOEP',
    duration: '15 Hour Course',
    price: {
      min: 75.00,
      max: 170.00
    },
    description: 'Drug Offender Education Program',
    available: true
  },
  // ...other courses
];

export const COMPANY_INFO = {
  name: 'DWI Education of SE Texas',
  phone: '(281) 215-4106',
  address: '2717 Commercial Center Blvd. Suite E200',
  city: 'Katy',
  state: 'TX',
  zip: '77494',
  room: '204',
  licenses: {
    dwi: {
      number: '982',
      expiry: '8/16/2026'
    },
    doep: {
      number: '982',
      expiry: '8/16/2026'
    },
    dwiI: {
      number: '982',
      expiry: '8/16/2026'
    }
  }
};