import Auth from '@/components/Auth'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
describe('Auth.vue', () => {
  const wrapper = shallowMount(Auth, {
    mocks: {
      $http: (msg) => msg
    }
  })
  it('should render correctly', () => { })
  it("name should be ''", () => {
    expect(wrapper.vm.name)
      .to.equal("")
  })
  it("email should be ''", () => {
    expect(wrapper.vm.email)
      .to.equal("")
  })
  it("validateEmail should return error message", () => {
    wrapper.vm.validateEmail('werwe')
    expect(wrapper.vm.msg['email'])
      .to.equal('Неверный Email')
  })
  it("validateEmail should return ''", () => {
    wrapper.vm.validateEmail('v.alue@true.com')
    expect(wrapper.vm.msg['email'])
      .to.equal('')
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
  it("submit() should work", async () => {
    await expect(wrapper.vm.submit())
      .to.equal('')
  })
})