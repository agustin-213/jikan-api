  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAEvPCg259FqUIHcB2WAWXTbSuxfAbVipcZ5xX15O2jUw7VQjvmUmqwB9W9V2Mk977lOACNaay4yu58YHnoG8ONNm3rM6Ixs_XLEwEPGQEPaXwOOoh63_z04bdpqQW_DHHAKEdnf_iSmmY4DTrnUKnWACfAYpoBa0q7MysEYFomKN23KLKm9m1m9JHjjtrP9ZQVUoRfsm7f94y8HLR0tFv24vg8QmAeYhCzjpnWu690EUIsUK2Ug9BYOSPLNNPWvrG8ELZxOhC4uAq0lUdVZEbPwbCkuobB6qkEvT_nkz4r8voIhY-P--syo5o9OcPgAoeG';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);