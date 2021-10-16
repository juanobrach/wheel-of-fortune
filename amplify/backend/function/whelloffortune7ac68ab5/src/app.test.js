const rewire = require("rewire")
const app = rewire("./app")
const convertUrlType = app.__get__("convertUrlType")
// @ponicode
describe("convertUrlType", () => {
    test("0", () => {
        let callFunction = () => {
            convertUrlType("foo bar", "N")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            convertUrlType("This is a Text", "N")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            convertUrlType("Foo bar", "N")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            convertUrlType("Hello, world!", "string")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            convertUrlType("This is a Text", "string")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            convertUrlType(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
