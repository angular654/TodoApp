import Notes from '@/components/Notes'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
const wrapper = shallowMount(Notes)

describe('Notes.vue',() => {
  it ('should render correctly', () => {})
  it("search should be ''", () => {
    expect(wrapper.vm.$data.search)
      .to.equal("")
  })
  it("reg should be null", () => {
    expect(wrapper.vm.$data.reg)
      .to.equal(null)
  })
  it("submitStatus should be null", () => {
    expect(wrapper.vm.$data.submitStatus)
      .to.equal('PENDING')
  })
  it("token should be null", () => {
    expect(wrapper.vm.$data.token)
      .to.equal(null)
  })

})