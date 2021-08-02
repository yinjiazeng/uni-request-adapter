import { AxiosRequestConfig  } from 'axios';
import settle from 'axios/lib/core/settle';

export default (config: AxiosRequestConfig) => {
	return new Promise((resolve, reject) => {
		let request: any = null;
    let newURL = '';
		const { baseURL, url, headers, data, params, ...rest } = config;

		if (config.cancelToken) {
			config.cancelToken.promise.then((cancel) => {
				if (request) {
					request.abort();
					reject(cancel);
				}
			});
		}

    if (url) {
      if (baseURL && !/^(https?:)?\/\//.test(url)) {
        newURL = baseURL + url;
      } else {
        newURL = url;
      }
    }

    request = uni.request({
      ...rest,
      url: newURL,
      header: headers,
      data: params || data,
      complete({ statusCode, header, ...rest }) {
        settle(resolve, reject, {
          ...rest,
          status: statusCode,
          headers: header,
          config
        });
      },
    });
	});
};