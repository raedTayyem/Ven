const dbService = require('../../service/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  query,
  getById,
  update,
  add,
};

function _buildCriteria(filterBy) {
  if (
    !filterBy.title &&
    !filterBy.isFree &&
    !filterBy.category &&
    !filterBy.thisWeek 

  ) {
    return filterBy;
  }
  const criteria = { $and: [] };
  if (filterBy.title) {
    criteria.$and.push({
      $or: [
        { title: { $regex: filterBy.title, $options: 'i' } },
        { desc: { $regex: filterBy.title, $options: 'i' } },
        { place: { $regex: filterBy.title, $options: 'i' } },
      ],
    });
  }
  if (filterBy.category) {
    criteria.$and.push({
      category: { $regex: filterBy.category, $options: 'i' },
    });
  }
  if (filterBy.isFree) {
    criteria.$and.push({ price: { $eq: 0 } });
  }
  if (filterBy.thisWeek) {
    const wantedDate = Math.floor(Date.now() / 1000) + 604800;
    criteria.$and.push({ startAt: { $lt: wantedDate } });
  }
  

  return criteria;
}

function _buildSort(sortBy) {
    const {sort, order} = sortBy;
    if (sort === 'price') {
        return {price: +order};
    }
    if (sort === 'new') {
        return {createdAt: +order}
    }
    if (sort === 'date') {
        return {startAt: +order}
    }
}

async function query(filterBy) {
    const collection = await dbService.getCollection('event');
    let filter;
    // Filter the data by title, desc, place, category
    if (!filterBy.sort) {
       filter  = _buildCriteria(filterBy);
       try {
        let events = await collection.find(filter).toArray();
        return events;
      } catch (err) {
        console.log('ERROR: cannot find events');
        throw err;
    }}
    // ascending or descending sort on existing fields; exaple {price : 1}  (asc is 1, dec is -1);
    else {
       filter = _buildSort(filterBy);
       try {
        let events = await collection.find().sort(filter).toArray();
        return events;
      } catch (err) {
        console.log('ERROR: cannot find events');
        throw err;
    }}
}

async function getById(eventId) {
  const collection = await dbService.getCollection('event');
  try {
    const event = await collection.findOne({ _id: ObjectId(eventId) });

    return event;
  } catch (err) {
    console.log('ERROR: cannot find event');
    throw err;
  }
}

async function update(event) {
  const collection = await dbService.getCollection('event');
  event._id = ObjectId(event._id);
  try {
    await collection.replaceOne({ _id: event._id }, { $set: event });
    return event;
  } catch (err) {
    console.log(`ERROR: cannot update event ${event._id}`);
    throw err;
  }
}

async function add(event) {
  const collection = await dbService.getCollection('event');
  try {
    await collection.insertOne(event);
    return event;
  } catch (err) {
    console.log(`ERROR: cannot insert event`);
    throw err;
  }
}
