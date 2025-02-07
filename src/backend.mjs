import PocketBase from 'pocketbase'; 
const db = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        data = data.map((event) => {
            event.imgUrl = db.files.getURL(event, event.image);
            return event;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue dans la liste des maison', error);
        return [];
    }
}

//backend.mjs
export async function getOffre(id) {
    try {
        let data = await db.collection('maison').getOne(id);
        data.imageUrl = db.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function bySurface(surfMin) {
    let records = await pb.collection('Maison').getFullList({ filter: `surface > '${surfMin}'` })
    records = records.map((maison) => {
        maison.imgURL = pb.files.getURL(maison, maison.images);
        return maison;
    })
    return records;
}