const { addFeeling } = require('./index')

const main = async () => {
  const coordinates = [
    [59.3365601, 18.0321006],
    [59.3366271, 18.0323346],
    [59.3365737, 18.0315755],
    [59.3353142, 18.0365509],
    [59.3331781, 18.025625],
    [59.337972, 18.01392],
  ]

  for (let coordinate of coordinates) {
    const [x, y] = coordinate
    const result = await addFeeling({
      body: JSON.stringify({
        personaId: 'aaa',
        status: Math.ceil(Math.random() * 3),
        location: [y, x],
      }),
    })
    console.log(result)
  }
}
//latitude: 59.342848000000004, longitude: 18.048614399999998

module.exports = main()

// 200 meters = 0.00003128600181118719

// id
// location
// userid
// status

/*
geonear
{
  near: [ 18.032041514336356, 59.33668272055678 ],
  distanceField: "distance",
  maxDistance: 0.00003128600181118719,
  spherical: true
}
{
  location: {
    $geoWithin: {
      $box: [
        [17.9960106,59.3226672],
        [18.1110874,59.353395]
      ]
    }
  }
}



$geoWithin: {
  $box: [
    [17.9960106,59.3226672],
    [18.1110874,59.353395]
  ]
}

{
  location: {
    $geoWithin: {
      $centerSphere: [
        [ 59.33606591541321, 18.032352154914065 ],
        0.000014144910937582778 ]
    }
  }
},
{
  $group: {
    _id: { status: "$status" },
    count: { $sum: 1 },
  }
}
{
  $project: {
    _id: 0,
    status: "$_id.status",
    count: 1
  }
}
*/
