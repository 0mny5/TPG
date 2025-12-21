from pydantic import BaseModel

class Params(BaseModel):
    direction:   str
    atmosphere:  str
    theme:       str
    colors:      str
    angle:       str
    story:       str

