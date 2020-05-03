const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL || 'mongodb://localhost/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a document into user collection', async () => {
    const users = db.collection('users');
    const mockUser = {_id: 'some-user-id', name: 'Justin'};
    await users.insertOne(mockUser);
    const insertedUser = await users.findOne({_id: 'some-user-id'});

    expect(insertedUser).toEqual(mockUser);
  });

  it('should insert many user documents into collection', async () => {
    const users = db.collection('users');
    const mockUsers = [{name: 'Bill'}, {name: 'Henry'}];
    await users.insertMany(mockUsers);
    const insertedUsers = await users.find().toArray();

    expect(insertedUsers).toEqual([
      expect.objectContaining({name: 'Justin'}),
      expect.objectContaining({name: 'Bill'}),
      expect.objectContaining({name: 'Henry'})
    ]);
  });

  it('should insert a document into product collection', async () => {
    const product = db.collection('products');
    const mockProduct = {_id: 'some-product-id', name: 'Barbell'};
    await product.insertOne(mockProduct);
    const insertedProduct = await product.findOne({_id: 'some-product-id'});

    expect(insertedProduct).toEqual(mockProduct);
  });

  it('should insert many product documents into collection', async () => {
    const products = db.collection('products');
    const mockProducts = [{name: 'BumperPlate'}, {name: 'dumbell'}];
    await products.insertMany(mockProducts);
    const insertedProducts = await products.find().toArray();

    expect(insertedProducts).toEqual([
      expect.objectContaining({name: 'Barbell'}),
      expect.objectContaining({name: 'BumperPlate'}),
      expect.objectContaining({name: 'dumbell'})
    ]);
  });

  it('should insert a document into category collection', async () => {
    const category = db.collection('categories');
    const mockCategory = {_id: 'some-category-id', name: 'Weights'};
    await category.insertOne(mockCategory);
    const insertedCategory = await category.findOne({_id: 'some-category-id'});

    expect(insertedCategory).toEqual(mockCategory);
  });

  it('should insert many category documents into collection', async () => {
    const categories = db.collection('categories');
    const mockCategories = [{name: 'Other'}, {name: 'Rigs'}];
    await categories.insertMany(mockCategories);
    const insertedCategories = await categories.find().toArray();

    expect(insertedCategories).toEqual([
      expect.objectContaining({name: 'Weights'}),
      expect.objectContaining({name: 'Other'}),
      expect.objectContaining({name: 'Rigs'})
    ]);
  });
});