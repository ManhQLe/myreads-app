const AppSettings ={
    nameMap:{
        "currentlyReading":"Current Reading",
        "wantToRead":"Want to Read",
        "read":"Read",
        "none":"None"
    },
    shelfOrderMap:["currentlyReading","wantToRead","read","none"],
    getShelfName: function(id){
        return this.nameMap[id];
    }
}

export default AppSettings;