class StatusMessage():
    """
    Generates a response message
    """
    def __init__(self, message, body, status, ***args, **kwargs):
        self.message = messages[status]
        self.detail = 
        self.status = status
        self.body = body
        if kwargs['ressource']:
            self.ressource = ressource


    def get_response(self):
        return self.__dict__

messages = {
    "201":{
        "message":""
    },
    "404":{
        "message":"Ressource not found"
    },
    "200":{
        "message":"Ressources succefully fetched"
    },
    "401":{
        "message":"Access forbidden"
    }
}




        