const { suppliers } = require('../controllers/rbac');
const { truncateSupplier } = require('../utils/truncate');

const mockRequest = (body = {}, params = {}) => ({ body, params });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

let supplierId;

beforeAll(async () => {
  await truncateSupplier();
});

//TODO Test Store Fungction
describe('(Suppliers) Test Store Function', () => {

  //Positive Testing
  test('(Positive Testing) with message: "Supplier added successfully"', async () => {
    const req = mockRequest({
      name: 'Supplier Name',
      address: 'Supplier Address'
    });
    const res = mockResponse();

    await suppliers.store(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'Supplier added successfully',
      data: expect.objectContaining({
        id: expect.any(Number),
        name: 'Supplier Name',
        address: 'Supplier Address'
      })
    });

    supplierId = res.json.mock.calls[0][0].data.id;
  });

  //Negative Testing
  test('(Negative Testing) with message: "Supplier Name and Address is required!"', async () => {
    const req = mockRequest({
      name: '',
      address: ''
    });
    const res = mockResponse();

    await suppliers.store(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'Supplier Name and Address is required!',
      data: null
    });
  });
});

// TODO Test Index Function
describe('(Suppliers) Test Index Function', () => {
  // Positive Testing
  test('(Positive Testing) with message: "success"', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await suppliers.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'success',
      data: expect.any(Array)
    });
  });
});

// TODO Test Show Function
describe('(Suppliers) Test Show Function', () => {
  // Positive Testing
  test('(Positive Testing) with message: "success"', async () => {
    const req = mockRequest({}, { id: supplierId });
    const res = mockResponse();

    await suppliers.show(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'success',
      data: expect.objectContaining({
        id: expect.any(Number),
        name: 'Supplier Name',
        address: 'Supplier Address'
      })
    });
  });

  // Negative Testing
  test('(Negative Testing) with message: "Supplier not found!"', async () => {
    const req = mockRequest({}, { id: 9999 });
    const res = mockResponse();

    await suppliers.show(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'Supplier not found!',
      data: null
    });
  });
});


/// TODO Test Update Function
describe('(Suppliers) Test Update Function', () => {
  // Positive Testing
  test('(Positive Testing) with message: "Supplier update successfully"', async () => {
    const updateReq = mockRequest({
      name: 'Updated Supplier Name',
      address: 'Updated Supplier Address'
    }, { id: supplierId });
    const updateRes = mockResponse();

    await suppliers.update(updateReq, updateRes);

    expect(updateRes.status).toHaveBeenCalledWith(200);
    expect(updateRes.json).toHaveBeenCalledWith({
      status: true,
      message: 'Supplier update successfully',
      data: null
    });
  });

  // Negative Testing
  test('(Negative Testing) with message: "Supplier not found!"', async () => {
    const updateReq = mockRequest({
      name: 'Updated Supplier Name',
      address: 'Updated Supplier Address'
    }, { id: 9999 });
    const updateRes = mockResponse();

    await suppliers.update(updateReq, updateRes);

    expect(updateRes.status).toHaveBeenCalledWith(404);
    expect(updateRes.json).toHaveBeenCalledWith({
      status: false,
      message: 'Supplier not found!',
      data: null
    });
  });
});

// TODO Test Destroy Function
describe('(Suppliers) Test Destroy Function', () => {
  //Positive Testing
  test('(Positive Testing) Supplier deleted successfully', async () => {
    const destroyReq = mockRequest({}, { id: supplierId });
    const destroyRes = mockResponse();

    await suppliers.destroy(destroyReq, destroyRes);

    expect(destroyRes.status).toHaveBeenCalledWith(200);
    expect(destroyRes.json).toHaveBeenCalledWith({
      status: true,
      message: 'Supplier deleted successfully',
      data: null
    });
  });

  // Negative Testing
  test('(Negative Testing) with message: "Supplier not found!"', async () => {
    const destroyReq = mockRequest({}, { id: 9999 });
    const destroyRes = mockResponse();

    await suppliers.destroy(destroyReq, destroyRes);

    expect(destroyRes.status).toHaveBeenCalledWith(404);
    expect(destroyRes.json).toHaveBeenCalledWith({
      status: false,
      message: 'Supplier not found!',
      data: null
    });
  });
});