import Notes from '@/components/Notes'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
describe('Notes.vue',() => {
  it("search should be ''", () => {
    const wrapper = shallowMount(Notes)
    expect(wrapper.vm.search)
      .to.equal("")
  })
  it("reg should be null", () => {
    const wrapper = shallowMount(Notes)
    expect(wrapper.vm.reg)
      .to.equal(null)
  })
  it("submitStatus should be null", () => {
    const wrapper = shallowMount(Notes)
    expect(wrapper.vm.$data.submitStatus)
      .to.equal('PENDING')
  })
  it("mocknote should be filtred", () => {
    const wrapper = shallowMount(Notes)
    expect(wrapper.vm.filteredNotes(mocknote))
      .to.equal(mocknote)
  })
  it("token should be null", () => {
    const wrapper = shallowMount(Notes)
    expect(wrapper.vm.token)
      .to.equal(null)
  })
})