export function mockGeolocationSuccess(latitude = 0, longitude = 0) {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockResolvedValueOnce((permissionSuccess) => {
      return Promise.resolve(
        permissionSuccess({
          coords: {
            latitude,
            longitude,
          },
        })
      );
    }),
  };
  return mockGeolocation;
}
