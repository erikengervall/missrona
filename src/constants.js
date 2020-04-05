export const FEELS = {
  Haphap: {
    backgroundColor: '#00ff00',
    colour: '#D5E8D4',
    emoji: '😄',
    status: 0,
    title: 'Good',
    tooltip: 'haphap',
  },
  Meh: {
    backgroundColor: '#ffff00',
    colour: '#FFF2CC',
    emoji: '😐',
    status: 1,
    title: 'Okay',
    tooltip: 'meh',
  },
  SmolDepresso: {
    backgroundColor: '#ff0000',
    colour: '#F8CECC',
    emoji: '😩',
    status: 2,
    title: 'Not so good',
    tooltip: 'smol depresso',
  },
}

export const TABS = {
  HEALTH_CHECK: '0',
  BROWSE_REGIONS: '1',
}

// currently unused
const MOCKS = [
  {
    lat: 59.342675,
    lng: 18.0385799,
    backgroundColor: FEELS.Haphap.backgroundColor,
  },
  {
    lat: 59.342676,
    lng: 18.0385797,
    backgroundColor: FEELS.Haphap.backgroundColor,
  },
  {
    lat: 59.342674,
    lng: 18.0385793,
    backgroundColor: FEELS.SmolDepresso.backgroundColor,
  },
  {
    lat: 59.342671,
    lng: 18.0385796,
    backgroundColor: FEELS.Meh.backgroundColor,
  },
]
