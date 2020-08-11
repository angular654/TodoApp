export default {
    filteredObject(obj) {
        const s = this.search.toLowerCase();
        return obj.filter(n => {
            return Object.values(n).some(m =>
                m
                    .toString()
                    .toLowerCase()
                    .includes(s)
            );
        });
    }
}