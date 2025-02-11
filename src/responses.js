const fs = require('fs'); // pull in the file system module

// Load our index fully into memory.
// THIS IS NOT ALWAYS THE BEST IDEA.
// We are using this for simplicity. Ideally we won't have
// synchronous operations or load entire files into memory.
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
// function to send response
const respond = (request, response, content, type, status=200) => {
  // set status code (200 success) and content type
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};

const titles = {
    success:"Success",
    badRequest:"Bad Request",
    unauthorized:"Unauthorized",
    forbidden:"Forbidden",
    internal:"Internal Server Error",
    notImplemented:"Not Implemented",
    notFound:"Resource Not Found",
}
const messages = {
    success:"This is a successful response",
    badRequest:"Missing valid query parameter set to true",
    badRequestValid: "This request has the required parameters",
    unauthorized:"Missing loggedIn query parameter set to yes",
    unauthorizedLoggedIn:"You have successfully viewed the content.",
    forbidden:"You do not have access to this content",
    internal:"Internal Server Error. Something went wrong.",
    notImplemented:"A get request for this page has not been implemented yet. Check again later for updated content",
    notFound:"The page you are looking for was not found",
}

const ids = {
  badRequest: "badRequest",
  unauthorized: "unauthorized",
  forbidden:"forbidden",
  internal:"internalError",
  notImplemented:"notImplemented",
  notFound:"notFound"
}

// function to handle the index page
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCss = (request,response) => {
  respond(request, response, style, 'text/css');
}

const getSuccess = (request,response) => {
    if (request.acceptedTypes[0] === 'text/xml') {
        // create a valid XML string with name and age tags.
        let responseXML = '<response>';
        responseXML = `${responseXML} <title>${titles.success}</title>`;
        responseXML = `${responseXML} <message>${messages.success}</message>`;
        responseXML = `${responseXML} <id>${ids.success}</id>`;
        responseXML = `${responseXML} </response>`;
    
        // return response passing out string and content type
        return respond(request, response, responseXML, 'text/xml', 200);
      }

      let responseObject = {
       title: titles.success,
       message: messages.success,
       id: ids.success
      };

    respond(request, response, JSON.stringify(responseObject), 'application/json', 200);
}

const getBadRequest = (request,response) => {
  const valid = request.query.get("valid");
  if(valid=="true"){
    if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.badRequest}</title>`;
      responseXML = `${responseXML} <message>${messages.badRequestValid}</message>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 200);
    }
    
    let responseObject = {
     title: titles.badRequest,
     message: messages.badRequestValid,
    };
  
  respond(request, response, JSON.stringify(responseObject), 'application/json', 200);
  }else{
    if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.badRequest}</title>`;
      responseXML = `${responseXML} <message>${messages.badRequest}</message>`;
      responseXML = `${responseXML} <id>${ids.badRequest}</id>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 400);
    }
    
    let responseObject = {
     title: titles.badRequest,
     message: messages.badRequest,
     id: ids.badRequest
    };
  
  respond(request, response, JSON.stringify(responseObject), 'application/json', 400);
  }
   
  
}

const getUnathorized = (request,response) => {
  const loggedIn = request.query.get("loggedIn");
  if(loggedIn=="yes"){
    if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.unauthorized}</title>`;
      responseXML = `${responseXML} <message>${messages.unauthorizedLoggedIn}</message>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 200);
    }
    
    let responseObject = {
     title: titles.unauthorized,
     message: messages.unauthorizedLoggedIn,
    };
  
  respond(request, response, JSON.stringify(responseObject), 'application/json', 200);
  }else{
    if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.unauthorized}</title>`;
      responseXML = `${responseXML} <message>${messages.unauthorized}</message>`;
      responseXML = `${responseXML} <id>${ids.unauthorized}</id>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 401);
    }
    
    let responseObject = {
     title: titles.unauthorized,
     message: messages.unauthorized,
     id: ids.unauthorized
    };
  
  respond(request, response, JSON.stringify(responseObject), 'application/json', 401);
  }
   
  
}

const getForbidden = (request,response) => {
  if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.forbidden}</title>`;
      responseXML = `${responseXML} <message>${messages.forbidden}</message>`;
      responseXML = `${responseXML} <id>${ids.forbidden}</id>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 403);
    }

    let responseObject = {
     title: titles.forbidden,
     message: messages.forbidden,
     id: ids.forbidden
    };

  respond(request, response, JSON.stringify(responseObject), 'application/json', 403);
}

const getInternal = (request,response) => {
  if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.internal}</title>`;
      responseXML = `${responseXML} <message>${messages.internal}</message>`;
      responseXML = `${responseXML} <id>${ids.internal}</id>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 500);
    }

    let responseObject = {
     title: titles.internal,
     message: messages.internal,
     id: ids.internal
    };

  respond(request, response, JSON.stringify(responseObject), 'application/json', 500);
}

const getNotImplemented = (request,response) => {
  if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.notImplemented}</title>`;
      responseXML = `${responseXML} <message>${messages.notImplemented}</message>`;
      responseXML = `${responseXML} <id>${ids.notImplemented}</id>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 501);
    }

    let responseObject = {
     title: titles.notImplemented,
     message: messages.notImplemented,
     id: ids.notImplemented
    };

  respond(request, response, JSON.stringify(responseObject), 'application/json', 501);
}

const getNotFound = (request,response) => {
  if (request.acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <title>${titles.notFound}</title>`;
      responseXML = `${responseXML} <message>${messages.notFound}</message>`;
      responseXML = `${responseXML} <id>${ids.notFound}</id>`;
      responseXML = `${responseXML} </response>`;
  
      // return response passing out string and content type
      return respond(request, response, responseXML, 'text/xml', 404);
    }

    let responseObject = {
     title: titles.notFound,
     message: messages.notFound,
     id: ids.notFound
    };

  respond(request, response, JSON.stringify(responseObject), 'application/json', 404);
}

// exports to set functions to public.
// In this syntax, you can do getCats:getCats, but if they
// are the same name, you can short handle to just getCats,
module.exports = {
  getIndex,
  getCss,
  getSuccess,
  getBadRequest,
  getUnathorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound
};