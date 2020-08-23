import Create from '@/components/Create'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
describe('Create.vue', () => {
  const wrapper = shallowMount(Create, {
    mocks: {
      $http: (msg) => msg
    }
  })
  it('should render correctly', () => { })
})