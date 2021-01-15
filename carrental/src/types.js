export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const PRODUCTION_YEAR = () => {
  let options=[]
  const thisYear = (new Date()).getFullYear();
  for (let i = thisYear; i >= 1900; i--) {
    options.push({
      key: i,
      text: i,
      value: i
    });
  }
  return options;
}

export const PREFERENCES = [
  {
    key: '1',
    text: 'make',
    value: 'make'
  },
  {
    key: '2',
    text: 'model',
    value: 'model'
  },
  {
    key: '3',
    text: 'body_type',
    value: 'body_type'
  },
  {
    key: '4',
    text: 'gear_type',
    value: 'gear_type'
  },
  {
    key: '5',
    text: 'fuel_type',
    value: 'fuel_type'
  },
  {
    key: '6',
    text: 'color',
    value: 'color'
  },
  {
    key: '7',
    text: 'production_year',
    value: 'production_year'
  },
  {
    key: '8',
    text: 'no_of_doors',
    value: 'no_of_doors'
  },
  {
    key: '9',
    text: 'power',
    value: 'power'
  },

]

export const PURPOSES = [
  {
    key: '1',
    text: 'Reason1',
    value: 'Reason1'
  },
  {
    key: '2',
    text: 'Reason2',
    value: 'Reason2'
  }

]

export const FUEL_TYPE = [
    {
      key: 'diesel',
      text: 'diesel',
      value: 'diesel'
    },
    {
      key: 'gasoline',
      text: 'gasoline',
      value: 'gasoline'
    },
    {
      key: 'gas',
      text: 'gas',
      value: 'gas'
    },
    {
      key: 'electric',
      text: 'electric',
      value: 'electric'
    },
    {
      key: 'electricdiesel',
      text: 'electric/diesel',
      value: 'electric/diesel'
    },
    {
      key: 'electricgasoline',
      text: 'electric/gasoline',
      value: 'electric/gasoline'
    },
    {
      key: 'other',
      text: 'other',
      value: 'other'
    }
  ]

  export const GEAR_TYPE = [
    {
      key: 'automatic',
      text: 'Automatic',
      value: 'Automatic'
    },
    {
      key: 'manual',
      text: 'Manual',
      value: 'Manual'
    },
    {
      key: 'semiautomatic',
      text: 'Semi-Automatic',
      value: 'Semi-Automatic'
    }
  ]

  export const BODY_TYPE = [
    {
        key: 'compact',
        text: 'compact',
        value: 'compact'
    },
    {
        key: 'convertible',
        text: 'convertible',
        value: 'convertible'
    },
    {
        key: 'coupe',
        text: 'coupe',
        value: 'coupe'
    },
    {
        key: 'offroad/pick-up',
        text: 'offroad/pick-up',
        value: 'offroad/pick-up'
    },
    {
        key: 'sedan',
        text: 'sedan',
        value: 'sedan'
    },
    {
        key: 'station-vagon',
        text: 'station-vagon',
        value: 'station-vagon'
    },
    {
        key: 'transporter',
        text: 'transporter',
        value: 'transporter'
    },
    {
        key: 'van',
        text: 'van',
        value: 'van'
    },
    {
        key: 'other',
        text: 'other',
        value: 'other'
    }
  ]

  export const NO_OF_DOORS= [
    {
        key: '2/3',
        text: '2/3',
        value: '2/3'
    },
    {
        key: '4/5',
        text: '4/5',
        value: '4/5'
    },
    {
        key: '6/7',
        text: '6/7',
        value: '6/7'
    },

]