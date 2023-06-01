const { components } = require('../controllers/rbac');
const { truncateComponent } = require('../utils/truncate');

const mockRequest = (body = {}, params = {}) => ({ body, params });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

let componentId;

beforeAll(async () => {
  await truncateComponent();
});

//TODO Test Store Fungction
describe('(Components) Test Store Function', () => {

  //Positive Testing
  test('(Positive Testing) with message: "Component added successfully"', async () => {
    const req = mockRequest({
      name: 'Component Name',
      description: 'Component description'
    });
    const res = mockResponse();

    await components.store(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'Component added successfully',
      data: expect.objectContaining({
        id: expect.any(Number),
        name: 'Component Name',
        description: 'Component description'
      })
    });

    componentId = res.json.mock.calls[0][0].data.id;
  });

  //Negative Testing
  test('(Negative Testing) with message: "Component Name and Description is required!"', async () => {
    const req = mockRequest({
      name: '',
      description: ''
    });
    const res = mockResponse();

    await components.store(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'Component Name and Description is required!',
      data: null
    });
  });
});

// TODO Test Index Function
describe('(Components) Test Index Function', () => {
  // Positive Testing
  test('(Positive Testing) with message: "success"', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await components.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'success',
      data: expect.any(Array)
    });
  });
});

// TODO Test Show Function
describe('(Components) Test Show Function', () => {
  // Positive Testing
  test('(Positive Testing) with message: "success"', async () => {
    const req = mockRequest({}, { id: componentId });
    const res = mockResponse();

    await components.show(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'success',
      data: expect.objectContaining({
        id: expect.any(Number),
        name: 'Component Name',
        description: 'Component description'
      })
    });
  });

  // Negative Testing
  test('(Negative Testing) with message: "Component not found!"', async () => {
    const req = mockRequest({}, { id: 9999 });
    const res = mockResponse();

    await components.show(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'Component not found!',
      data: null
    });
  });
});

/// TODO Test Update Function
describe('(Components) Test Update Function', () => {
  // Positive Testing
  test('(Positive Testing) with message: "Component updated successfully"', async () => {
    const updateReq = mockRequest({
      name: 'Updated Component Name',
      description: 'Updated Component'
    }, { id: componentId });
    const updateRes = mockResponse();

    await components.update(updateReq, updateRes);

    expect(updateRes.status).toHaveBeenCalledWith(200);
    expect(updateRes.json).toHaveBeenCalledWith({
      status: true,
      message: 'Component updated successfully',
      data: null
    });
  });

  // Negative Testing
  test('(Negative Testing) with message: "Component not found!"', async () => {
    const updateReq = mockRequest({
      name: 'Updated Component Name',
      description: 'Updated Component'
    }, { id: 9999 });
    const updateRes = mockResponse();

    await components.update(updateReq, updateRes);

    expect(updateRes.status).toHaveBeenCalledWith(404);
    expect(updateRes.json).toHaveBeenCalledWith({
      status: false,
      message: 'Component not found!',
      data: null
    });
  });
});

// TODO Test Destroy Function
describe('(Components) Test Destroy Function', () => {
  //Positive Testing
  test('(Positive Testing) Component deleted successfully', async () => {
    const destroyReq = mockRequest({}, { id: componentId });
    const destroyRes = mockResponse();

    await components.destroy(destroyReq, destroyRes);

    expect(destroyRes.status).toHaveBeenCalledWith(200);
    expect(destroyRes.json).toHaveBeenCalledWith({
      status: true,
      message: 'Component deleted successfully',
      data: null
    });
  });

  // Negative Testing
  test('(Negative Testing) with message: "Component not found!"', async () => {
    const destroyReq = mockRequest({}, { id: 9999 });
    const destroyRes = mockResponse();

    await components.destroy(destroyReq, destroyRes);

    expect(destroyRes.status).toHaveBeenCalledWith(404);
    expect(destroyRes.json).toHaveBeenCalledWith({
      status: false,
      message: 'Component not found!',
      data: null
    });
  });
});

// TODO Test addSupplierComponents Function
describe('(Components) Test addSupplierComponents Function', () => {
  // Negative Testing
  test('(Negative Testing) with message: "Supplier or Component not found!"', async () => {
    const req = mockRequest({
      supplier_id: 9999,
      component_id: componentId
    });
    const res = mockResponse();

    await components.addSupplierComponents(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'Supplier or Component not found!',
      data: null
    });
  });
});

// TODO Test DestroySupplierComponents Function
describe('(Components) Test DestroySupplierComponents Function', () => {
  // Negative Testing
  test('(Negative Testing) with message: "Component-Supplier not found!"', async () => {
    const destroyReq = mockRequest({}, { id: 9999 });
    const destroyRes = mockResponse();

    await components.destroySupplierComponents(destroyReq, destroyRes);

    expect(destroyRes.status).toHaveBeenCalledWith(404);
    expect(destroyRes.json).toHaveBeenCalledWith({
      status: false,
      message: 'Component-Supplier not found!',
      data: null
    });
  });
});
