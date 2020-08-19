import Auth from '@/components/Auth'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
describe('Notes.vue',() => {
  it("name should be ''", () => {
    const wrapper = shallowMount(Auth)
    expect(wrapper.vm.name)
      .to.equal("")
  })
  
})