import Files from '@/components/Files'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
let mockfiles = [{
  'name': "angular.png",
  'name': "vue.jpg"
}]

describe('Files.vue', () => {
  const wrapper = shallowMount(Files)
  it('should render correctly', () => { })
  it("filteredFiles should be a function", () => {
    expect(wrapper.vm.filteredFiles).to.be.a('function')
  })
  it("mockfile should be filtred", () => {
    let result = [{
      'name': "angular.png"
    }]
    wrapper.vm.search = 'angular'
    expect(wrapper.vm.filteredFiles(mockfiles)).to.eql(result)
  })
})  