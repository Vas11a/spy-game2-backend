

export const setGame = (data, locas, arr) => {
    const location = locas[Math.floor(Math.random() * locas.length)]
    let id = 0;
    if (arr.length !== 0) {
        id = arr[arr.length -1].id + 1
    }
    return{
        id: id,
        roomName: data.roomName,
        amount: +data.amount,
        time: data.time,
        location: location,
        spyId: Math.floor(Math.random() * data.amount) + 1,
        entered: 0
    }
}


export const enterToGame = (data, arr) => {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].id === data) {
            if (arr[i].entered == arr[i].amount) {
                return 'room is full'
            }
            arr[i].entered += 1
            if (arr[i].entered === arr[i].spyId) {
                return ['you-spy', arr[i].location, arr[i].id]
            } 
            return ['you-not-spy', arr[i].location, arr[i].id]
        }
    }
}