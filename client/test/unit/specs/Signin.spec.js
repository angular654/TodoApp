import Signin from '@/components/Signin'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import sinon  from 'sinon'
describe('Signin.vue', () => {
    const wrapper = shallowMount(Signin, {
        mocks : sinon.mock({
            $http: (msg) => msg})
    })
    it('should render correctly', () => { })
    it("name should be ''", () => {
        expect(wrapper.vm.name)
            .to.equal('')
    })
    it("submitStatus should be null", () => {
        expect(wrapper.vm.submitStatus)
            .to.equal(null)
    })
    it("validatePassword should return error message", () => {
        wrapper.vm.validatePassword('wewre')
        expect(wrapper.vm.msg['password'])
            .to.equal("Длина  пароля должна быть минимум 10 символов! " +
                `осалось символов : 5`)
    })
    it("validateName should return ''", () => {
        wrapper.vm.validateName('ergfdgds4234bvc23dfs')
        expect(wrapper.vm.msg['name'])
            .to.equal('')
    })
    it("validateName should return error message", () => {
        wrapper.vm.validateName('er')
        expect(wrapper.vm.msg['name'])
            .to.equal("Длина  логина  должна быть минимум 5 символов! " +
                `осалось символов : 3`)
    })
    it("signin should work", async () => {
        await expect(wrapper.vm.$methods.submit())
            .to.equal('')
    })
    it("signout should work", async () => {
        await expect(wrapper.vm.logout())
            .to.equal('')
    })
})