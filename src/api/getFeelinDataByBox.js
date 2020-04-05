import { server } from '../YeOldeNetworkLayer'

// const n = 59.374665870211466
// const s = 59.29446880123298
// const e = 18.15293306945799
// const w = 17.973546930541975

let data

const generateRandomDataPoints = ({ north, south, east, west }) => {
  if (data) return data
  data = new Array(20).fill(1)

  const latitudeRange = north - south
  const longitudeRange = east - west

  data = data.map((x) => ({
    lat: south + Math.random() * latitudeRange,
    lng: west + Math.random() * longitudeRange,
    status: Math.floor(Math.random() * 3) + 1,
  }))

  return data
}

const getFeelinDataByBox = async ({ north, south, east, west }) => {
  const response = await generateRandomDataPoints({ north, south, east, west })
  return response
}

// const getFeelinDataByBox = async ({ north, south, east, west }) => {
//   const response = await server.get(`/?n=${north}&s=${south}&e=${east}&w=${west}`)
//   return response
// }

export default getFeelinDataByBox
